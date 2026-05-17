# Deploy Guide

Инструкция для запуска проекта на Linux-сервере по IPv4. Домен и HTTPS можно добавить отдельным шагом после проверки сайта по IP.

## 1. Требования к серверу

- Linux-сервер с публичным IPv4.
- Docker и Docker Compose plugin.
- Открыт HTTP-порт, обычно `80`.
- Минимально комфортная конфигурация: 2 vCPU, 4 GB RAM, 40 GB disk.

Проверка Docker:

```bash
docker --version
docker compose version
```

## 2. Подготовка проекта

Склонировать или скопировать репозиторий на сервер:

```bash
git clone <REPOSITORY_URL> bakery-site
cd bakery-site/infra
```

Если проект переносится архивом, важно не переносить локальные `node_modules`, `.next`, `dist`, `.env` из рабочей машины.

## 3. Production `.env`

Создать реальный файл окружения рядом с `docker-compose.yml`:

```bash
cp .env.example .env
```

Заменить значения:

- `HTTP_PORT=80`
- `POSTGRES_PASSWORD`
- `STRAPI_APP_KEYS`
- `STRAPI_API_TOKEN_SALT`
- `STRAPI_ADMIN_JWT_SECRET`
- `STRAPI_TRANSFER_TOKEN_SALT`
- `STRAPI_JWT_SECRET`
- `STRAPI_ENCRYPTION_KEY`
- `DATABASE_PASSWORD`
- `MINIO_ROOT_USER`
- `MINIO_ROOT_PASSWORD`
- `MINIO_PUBLIC_URL=http://SERVER_IP/media`
- `NEXT_PUBLIC_SITE_URL=http://SERVER_IP`
- `NEXT_PUBLIC_STRAPI_URL=http://SERVER_IP`

`DATABASE_PASSWORD` должен совпадать с `POSTGRES_PASSWORD`, если используется текущий Compose setup.

Пример генерации секретов:

```bash
openssl rand -base64 32
```

Для `STRAPI_APP_KEYS` нужно четыре значения через запятую:

```text
STRAPI_APP_KEYS=key1,key2,key3,key4
```

Файл `.env` нельзя коммитить и публиковать.

## 4. Сборка и запуск

Из директории `infra`:

```bash
docker compose build frontend strapi
docker compose up -d
```

Проверить состояние:

```bash
docker compose ps
```

Ожидаемо:

- `postgres` healthy
- `minio` healthy
- `strapi` healthy
- `frontend` healthy
- `nginx` healthy
- `minio-init` завершился с кодом `0`

## 5. Проверка по IP

Заменить `SERVER_IP` на адрес сервера:

```bash
curl -I http://SERVER_IP/
curl -I http://SERVER_IP/catalog
curl -I http://SERVER_IP/admin
curl -I http://SERVER_IP/api/categories
curl -I http://SERVER_IP/minio/
curl -I http://SERVER_IP/media/health.txt
```

Публичные адреса:

```text
http://SERVER_IP/          frontend
http://SERVER_IP/admin     Strapi admin
http://SERVER_IP/api       Strapi API
http://SERVER_IP/minio/    MinIO Console
http://SERVER_IP/media/    public media bucket
```

## 6. Первичная настройка CMS

1. Открыть `http://SERVER_IP/admin`.
2. Создать первого администратора Strapi.
3. Проверить коллекции `Category`, `Product`, `Promotion`.
4. Загрузить изображение товара через Media Library.
5. Открыть товар на сайте и проверить, что изображение отдается через `/media`.

## 7. MinIO

MinIO Console:

```text
http://SERVER_IP/minio/
```

Логин и пароль берутся из `.env`:

```text
MINIO_ROOT_USER
MINIO_ROOT_PASSWORD
```

Bucket `bakery-media` создается сервисом `minio-init`. Для публичного отображения изображений bucket получает anonymous download policy.

## 8. Обновление проекта

После получения новых изменений:

```bash
git pull
cd infra
docker compose build frontend strapi
docker compose up -d
docker compose ps
```

Если менялись только Nginx-настройки:

```bash
docker compose up -d nginx
```

## 9. Резервные копии

Минимально нужно сохранять:

- volume PostgreSQL: `infra_postgres-data`
- volume MinIO: `infra_minio-data`
- production `.env`

Перед реальным публичным запуском стоит настроить регулярные backup-и базы и медиа на внешний storage.

## 10. Домен и HTTPS

После покупки домена:

1. Создать DNS A-запись на IPv4 сервера.
2. Заменить в `.env`:

```env
NEXT_PUBLIC_SITE_URL=https://example.ru
NEXT_PUBLIC_STRAPI_URL=https://example.ru
MINIO_PUBLIC_URL=https://example.ru/media
```

3. Добавить HTTPS в Nginx.
4. Выпустить сертификат Let's Encrypt.
5. Включить redirect HTTP -> HTTPS.
6. Пересобрать frontend и strapi:

```bash
docker compose build frontend strapi
docker compose up -d
```

