# Stage 1: Composer
FROM composer:2 AS vendor
WORKDIR /app

COPY composer.json composer.lock ./
RUN composer install \
    --no-dev \
    --no-interaction \
    --prefer-dist \
    --optimize-autoloader \
    --no-scripts

# Stage 2: Runtime
FROM php:8.4-cli-bookworm AS app
WORKDIR /var/www/html

# ដំឡើង dependencies ដែលចាំបាច់
RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    unzip \
    libpq-dev \
    libicu-dev \
    libzip-dev \
    && docker-php-ext-install -j"$(nproc)" \
    pdo_pgsql \
    bcmath \
    intl \
    zip \
    opcache \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# ចម្លងកូដចូល
COPY . .
COPY --from=vendor /app/vendor ./vendor

# កែសម្រួល Permissions (ធ្វើនៅក្រោម User Root សិនមុននឹងដូរទៅ www-data)
RUN mkdir -p \
    storage/framework/cache \
    storage/framework/sessions \
    storage/framework/views \
    storage/logs \
    bootstrap/cache \
    && chown -R www-data:www-data /var/www/html \
    && chmod -R 775 storage bootstrap/cache

# កំណត់ Environment
ENV APP_ENV=production
ENV APP_DEBUG=false
ENV LOG_CHANNEL=stderr
ENV PORT=10000 

# Render ប្រើ Port 10000 ជា Default សម្រាប់ Free Tier
EXPOSE 10000

# ប្តូរទៅប្រើ User www-data ដើម្បីសុវត្ថិភាព
USER www-data

# Command សម្រាប់ Start (រត់ Migration រួចទើប Start Server)
CMD sh -c "php artisan config:cache && php artisan route:cache && \
    if [ \"${RUN_MIGRATIONS}\" = \"true\" ]; then php artisan migrate --force; fi; \
    php artisan serve --host=0.0.0.0 --port=${PORT:-10000}"