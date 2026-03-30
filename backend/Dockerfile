# Stage 1: Composer (PHP dependencies)
FROM composer:2 AS vendor
WORKDIR /app
COPY composer.json composer.lock ./
RUN composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader --no-scripts

# Stage 2: Node (Build CSS/JS for Vite)
FROM node:20-alpine AS frontend
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 3: Runtime (PHP)
FROM php:8.4-cli-bookworm AS app
WORKDIR /var/www/html

RUN apt-get update && apt-get install -y --no-install-recommends \
    git unzip libpq-dev libicu-dev libzip-dev \
    && docker-php-ext-install -j"$(nproc)" pdo_pgsql bcmath intl zip opcache \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# ចម្លងកូដ និង Vendor
COPY . .
COPY --from=vendor /app/vendor ./vendor
# ចម្លងឯកសារដែល Build រួចពី Node Stage (នេះជាចំណុចសំខាន់)
COPY --from=frontend /app/public/build ./public/build

# កែសម្រួល Permissions
RUN mkdir -p storage/framework/cache storage/framework/sessions storage/framework/views storage/logs bootstrap/cache \
    && chown -R www-data:www-data /var/www/html \
    && chmod -R 775 storage bootstrap/cache

ENV APP_ENV=production
ENV APP_DEBUG=false
ENV LOG_CHANNEL=stderr
ENV PORT=10000

USER www-data

CMD sh -c "php artisan config:cache && php artisan route:cache && \
    if [ \"${RUN_MIGRATIONS}\" = \"true\" ]; then php artisan migrate --force; fi; \
    php artisan serve --host=0.0.0.0 --port=${PORT:-10000}"