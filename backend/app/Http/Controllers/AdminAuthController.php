<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\Two\GoogleProvider;

class AdminAuthController extends Controller
{
    public function redirectToGoogle(): JsonResponse
    {
        /** @var GoogleProvider $google */
        $google = Socialite::driver('google');
        $url = $google->stateless()->redirect()->getTargetUrl();

        return response()->json([
            'url' => $url,
        ]);
    }

    public function handleGoogleCallback(Request $request): RedirectResponse
    {
        $frontendBase = rtrim((string) env('FRONTEND_URL', 'http://localhost:5173'), '/');

        if ($request->filled('error')) {
            $oauthError = trim((string) $request->query('error'));
            $oauthDescription = trim((string) $request->query('error_description', $oauthError));
            $message = rawurlencode($oauthDescription !== '' ? $oauthDescription : 'Google sign-in failed.');

            return redirect()->away("{$frontendBase}/admin?admin_error={$message}");
        }

        try {
            /** @var GoogleProvider $google */
            $google = Socialite::driver('google');
            $googleUser = $google->stateless()->user();
        } catch (\Throwable $error) {
            Log::error('Google OAuth callback failed.', [
                'message' => $error->getMessage(),
                'exception' => $error::class,
            ]);

            $message = app()->isLocal() && trim($error->getMessage()) !== ''
                ? rawurlencode($error->getMessage())
                : rawurlencode('Google sign-in failed. Please try again.');

            return redirect()->away("{$frontendBase}/admin?admin_error={$message}");
        }

        $email = mb_strtolower(trim((string) $googleUser->getEmail()));

        if ($email === '') {
            $message = rawurlencode('Google account has no email address.');

            return redirect()->away("{$frontendBase}/admin?admin_error={$message}");
        }

        $allowedGoogleAdminEmail = mb_strtolower(trim((string) env('ADMIN_GOOGLE_ALLOWED_EMAIL', '')));

        if ($allowedGoogleAdminEmail !== '' && ! hash_equals($allowedGoogleAdminEmail, $email)) {
            $message = rawurlencode('This Google account is not allowed for admin login.');

            return redirect()->away("{$frontendBase}/admin?admin_error={$message}");
        }

        // Allow Google sign-in only for users that already exist in PostgreSQL.
        $user = User::query()->whereRaw('LOWER(email) = ?', [$email])->first();

        if (! $user) {
            $message = rawurlencode('This Google account is not allowed. Email not found in database.');

            return redirect()->away("{$frontendBase}/admin?admin_error={$message}");
        }

        $admin = Admin::query()->updateOrCreate(
            ['email' => $user->email],
            [
                'name' => $user->name,
                'password' => $user->password,
            ],
        );

        $token = $admin->createToken('admin-dashboard')->plainTextToken;

        $query = http_build_query([
            'admin_token' => $token,
            'admin_name' => $admin->name,
            'admin_email' => $admin->email,
        ]);

        return redirect()->away("{$frontendBase}/admin?{$query}");
    }

    public function login(Request $request): JsonResponse
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        $email = trim($credentials['email']);
        $password = trim($credentials['password']);

        // Authenticate only from application users stored in PostgreSQL.
        $user = User::query()->whereRaw('LOWER(email) = ?', [mb_strtolower($email)])->first();

        if (! $user) {
            return response()->json([
                'message' => 'Invalid admin credentials.',
            ], 422);
        }

        $userPasswordMatches = Hash::check($password, $user->password);

        // Support manual pgAdmin entries with plain-text passwords once,
        // then upgrade them to a proper hash.
        if (! $userPasswordMatches && hash_equals((string) $user->password, $password)) {
            $user->password = Hash::make($password);
            $user->save();
            $userPasswordMatches = true;
        }

        if (! $userPasswordMatches) {
            return response()->json([
                'message' => 'Invalid admin credentials.',
            ], 422);
        }

        $admin = Admin::query()->updateOrCreate(
            ['email' => $user->email],
            [
                'name' => $user->name,
                'password' => $user->password,
            ],
        );

        $token = $admin->createToken('admin-dashboard')->plainTextToken;

        return response()->json([
            'token' => $token,
            'admin' => [
                'id' => $admin->id,
                'name' => $admin->name,
                'email' => $admin->email,
            ],
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        $token = $request->user()?->currentAccessToken();

        if ($token) {
            $token->delete();
        }

        return response()->json([
            'message' => 'Logged out successfully.',
        ]);
    }
}
