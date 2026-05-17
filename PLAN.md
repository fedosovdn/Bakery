# Bakery Site Implementation Plan

Рабочий план реализации проекта. README описывает цель, архитектуру и требования, а этот файл фиксирует порядок работ, статус и критерии готовности.

## Текущий статус

- [x] Репозиторий создан
- [x] README с описанием проекта добавлен
- [x] Структура monorepo создана
- [x] Frontend приложение создано
- [x] Strapi CMS создана
- [x] Docker Compose инфраструктура добавлена
- [x] Локальный запуск проверен
- [ ] Production deploy подготовлен

## Этап 1. Каркас репозитория

Цель: подготовить базовую структуру проекта, чтобы frontend, CMS и инфраструктура развивались в одном репозитории.

### Задачи

- [x] Создать директорию `frontend/`
- [x] Создать директорию `cms/`
- [x] Создать директорию `infra/`
- [x] Создать директории `infra/nginx/` и `infra/nginx/conf.d/`
- [x] Добавить корневой `.gitignore`
- [x] Добавить `infra/.env.example`
- [x] Зафиксировать базовые команды запуска в README

### Критерии готовности

- В репозитории есть структура monorepo из README
- Секреты не попадают в Git
- Есть понятное место для frontend, CMS и инфраструктуры

## Этап 2. Frontend MVP

Цель: поднять публичный сайт на Next.js и сделать первый видимый результат с mock-данными.

### Задачи

- [x] Создать Next.js приложение в `frontend/`
- [x] Настроить TypeScript
- [x] Настроить базовые стили
- [x] Создать общий layout: header, footer, навигация
- [x] Создать страницу `/`
- [x] Создать страницу `/catalog`
- [x] Создать страницу `/catalog/[slug]`
- [x] Создать страницу `/promotions`
- [x] Создать страницу `/about`
- [x] Создать страницу `/contacts`
- [x] Добавить mock-данные для товаров, категорий, акций и настроек сайта
- [x] Добавить отображение цены с учетом `priceOnRequest`
- [x] Добавить фильтрацию каталога по категориям

### Критерии готовности

- Frontend запускается локально
- Все основные страницы доступны
- Каталог можно просматривать и фильтровать
- Страница товара открывается по slug
- Сайт выглядит как рабочий MVP, даже без CMS

## Этап 3. Strapi CMS

Цель: создать CMS, через которую сотрудники смогут редактировать контент сайта.

### Задачи

- [x] Создать Strapi приложение в `cms/`
- [x] Настроить PostgreSQL как основную базу данных
- [x] Создать Collection Type `Category`
- [x] Создать Collection Type `Product`
- [x] Создать Collection Type `Promotion`
- [x] Создать Single Type `Site Settings`
- [x] Настроить связи Product -> Category
- [x] Настроить роли и публичные права чтения
- [x] Добавить тестовый контент

### Критерии готовности

- Strapi admin доступен локально
- Все модели соответствуют README
- Через админку можно создать категории, товары, акции и настройки сайта
- Публичный API отдает нужные данные для frontend

## Этап 4. Интеграция Frontend и Strapi

Цель: заменить mock-данные на реальные данные из Strapi API.

### Задачи

- [x] Добавить API-клиент для Strapi
- [x] Описать TypeScript-типы данных
- [x] Получать Site Settings для главной, контактов, header и footer
- [x] Получать категории для главной и каталога
- [x] Получать товары для главной, каталога и страницы товара
- [x] Получать активные акции
- [x] Реализовать обработку пустых состояний
- [x] Реализовать fallback при недоступной CMS
- [x] Настроить переменные окружения frontend

### Критерии готовности

- Frontend отображает данные из Strapi
- Сайт не падает при пустом каталоге или недоступной CMS
- Изображения корректно отображаются через URL из CMS

## Этап 5. MinIO и загрузка медиа

Цель: хранить изображения товаров и акций в S3-compatible storage.

### Задачи

- [x] Добавить MinIO в Docker Compose
- [x] Создать bucket `bakery-media`
- [x] Настроить Strapi upload provider для S3-compatible storage
- [x] Проверить загрузку изображений через Strapi admin
- [x] Проверить отображение публичного MinIO bucket через `/media`
- [x] Проверить отображение изображений из Strapi на frontend

### Критерии готовности

- Изображения загружаются через Strapi
- Файлы сохраняются в MinIO
- Frontend корректно показывает медиа из CMS

## Этап 6. Docker Compose и Nginx

Цель: подготовить единый запуск проекта через Docker Compose.

### Задачи

- [x] Добавить Dockerfile для frontend
- [x] Добавить Dockerfile для cms
- [x] Добавить `infra/docker-compose.yml`
- [x] Добавить PostgreSQL service
- [x] Добавить Strapi service
- [x] Добавить MinIO service
- [x] Добавить frontend service
- [x] Добавить nginx service
- [x] Настроить Nginx routing `/`
- [x] Настроить Nginx routing `/admin`
- [x] Настроить Nginx routing `/api`
- [x] Настроить Nginx routing `/minio`
- [x] Проверить health и restart policy сервисов

### Критерии готовности

- Проект запускается одной Docker Compose командой
- Frontend доступен через Nginx
- Strapi admin доступен через `/admin`
- Strapi API доступен через `/api`
- MinIO Console доступна через `/minio`

## Этап 7. Проверка и стабилизация

Цель: убедиться, что MVP работает целиком.

### Задачи

- [x] Проверить локальный запуск frontend
- [x] Проверить локальный запуск Strapi
- [x] Проверить локальный запуск Docker Compose
- [x] Проверить основные страницы сайта
- [x] Проверить фильтрацию каталога
- [x] Проверить страницу товара
- [x] Проверить акции
- [x] Проверить контакты и карту
- [x] Проверить загрузку изображений
- [x] Проверить отсутствие секретов в Git
- [x] Обновить README по фактическому запуску

### Критерии готовности

- MVP можно показать владельцу кондитерской
- Основные пользовательские сценарии работают
- Разработчик может поднять проект по README

## Этап 8. Deploy на сервер

Цель: подготовить и выполнить запуск на Linux-сервере.

### Задачи

- [ ] Подготовить production `.env` на сервере
- [ ] Собрать Docker images
- [ ] Запустить Docker Compose на сервере
- [ ] Проверить доступ по IPv4
- [ ] Проверить frontend
- [ ] Проверить Strapi admin
- [ ] Проверить MinIO Console
- [ ] Проверить Strapi API
- [ ] Проверить загрузку изображений
- [ ] Проверить отображение товаров на сайте
- [x] Описать дальнейшие шаги по домену и HTTPS

### Критерии готовности

- Сайт доступен по IP
- Админка CMS доступна сотрудникам
- Контент можно редактировать без правок в коде
- Есть понятный следующий шаг для домена и HTTPS

## Отложено на будущие этапы

- Онлайн-заказы
- Корзина
- Онлайн-оплата
- Личный кабинет
- Авторизация клиентов
- Блог, новости, рецепты
- Отдельный ASP.NET backend
- Интеграции с Telegram, WhatsApp или CRM
- HTTPS через Let’s Encrypt после покупки домена
- Замена локального MinIO на внешний S3-compatible storage

## Ближайший следующий шаг

Следующий шаг требует данных сервера: IPv4, способ доступа к серверу и production-секреты. После этого можно создать production `.env`, собрать Docker images на сервере и выполнить первый запуск по IP.

## Проверки

- [x] `npm.cmd run typecheck` в `frontend/`
- [x] `npm.cmd run build` в `frontend/`
- [x] `npm.cmd audit --audit-level=moderate` в `frontend/`
- [x] HTTP-проверка маршрутов `/`, `/catalog`, `/catalog/[slug]`, `/promotions`, `/about`, `/contacts`
- [ ] Визуальная проверка в in-app браузере: не выполнена из-за локального `EPERM` в browser runtime
- [x] `npm.cmd run build` в `cms/`
- [ ] `npm.cmd audit --audit-level=moderate` в `cms/`: остались moderate уязвимости в Strapi/Vite/users-permissions dependency tree; `--force` предлагает breaking downgrade, не применялось
- [x] `docker compose --env-file .env.example config` в `infra/`
- [x] `docker compose build frontend strapi`
- [x] `docker compose up -d`
- [x] Проверка `http://localhost:8080/`
- [x] Проверка `http://localhost:8080/api/categories`
- [x] Проверка `http://localhost:8080/api/products?populate=category`
- [x] Проверка `http://localhost:8080/admin`
- [x] Проверка `http://localhost:8080/minio/`
- [x] Исправлен Nginx routing для Strapi admin endpoints `/content-manager`, `/content-type-builder`, `/upload`, `/users-permissions`, `/i18n`
- [x] Проверка `http://localhost:8080/media/health.txt`
- [x] Проверка загруженного изображения `http://localhost:8080/media/Coconut_Layer_Cake_94ac155886.jfif`
- [x] Проверка изображения из Strapi на `/catalog` и `/catalog/honey-cake-caramel`
- [x] Проверка health/restart policy: `postgres`, `minio`, `strapi`, `frontend`, `nginx` имеют `restart: unless-stopped`, основные сервисы отображаются как `healthy`
- [x] Проверка фильтра каталога `http://localhost:8080/catalog?category=cakes`
- [x] Проверка пустого состояния каталога `http://localhost:8080/catalog?category=unknown-category`
- [x] Проверка отсутствия секретов в Git: `infra/.env`, `cms/.env`, build/runtime артефакты игнорируются
- [x] README обновлен по фактическому Docker Compose запуску, MinIO `/media`, healthcheck/restart policy и переменным окружения
- [x] Добавлена deploy-инструкция `infra/DEPLOY.md` для Linux-сервера, production `.env`, проверки по IPv4, backup-ов, домена и HTTPS
