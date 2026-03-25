<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Smalot\PdfParser\Parser;
use Throwable;

class PdfExtractController extends Controller
{
    public function extract(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'pdf' => ['required', 'file', 'mimes:pdf', 'max:20480'],
        ]);

        $pdfFile = $validated['pdf'];

        try {
            $parser = new Parser();
            $pdf = $parser->parseFile($pdfFile->getRealPath());

            // This is the full extracted text string from the uploaded PDF.
            $extractedText = $pdf->getText();

            return response()->json([
                'message' => 'PDF text extracted successfully.',
                'extracted_text' => $extractedText,
            ]);
        } catch (Throwable $error) {
            return response()->json([
                'message' => 'Unable to extract text from this PDF.',
                'error' => $error->getMessage(),
            ], 422);
        }
    }
}
