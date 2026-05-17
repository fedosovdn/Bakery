# Bakery Site

Информационный сайт для небольшой кондитерской с каталогом продукции, акциями и контактной информацией.

## 1. Цель проекта

Сделать гибкий сайт, где сотрудники кондитерской смогут самостоятельно редактировать контент через CMS без внесения правок в код.

На первом этапе сайт будет информационным:

- главная страница;
- каталог продукции;
- категории товаров;
- акции;
- страница «О нас»;
- контакты;
- карта;
- телефон;
- Telegram / WhatsApp.

На первом этапе не планируются:

- корзина;
- онлайн-оплата;
- личный кабинет;
- авторизация клиентов;
- заявки через сайт;
- блог / новости / рецепты.

При этом архитектура должна позволять в будущем добавить заказы, блог, новости, SEO-разделы и отдельный backend на ASP.NET.

---

## 2. Выбранный стек

### Frontend

**Next.js**

Используется для публичного сайта кондитерской.

Задачи frontend:

- отображение главной страницы;
- отображение каталога;
- фильтрация товаров по категориям;
- отображение карточек товаров;
- отображение акций;
- отображение контактов;
- получение данных из Strapi API.

### CMS

**Strapi**

Используется как headless CMS с админ-панелью.

Задачи CMS:

- управление товарами;
- управление категориями;
- управление акциями;
- управление контентом страниц;
- управление изображениями;
- роли и доступы для сотрудников.

Админка Strapi будет доступна по адресу:

```text
/admin
```

### Database

**PostgreSQL**

Используется как основная база данных для Strapi.

### Object Storage

**MinIO**

Используется для хранения изображений товаров, акций и другого медиа-контента.

MinIO разворачивается на том же сервере через Docker Compose.

### Reverse Proxy

**Nginx**

Используется как единая точка входа на сервер.

Маршрутизация:

```text
/       -> Next.js frontend
/admin  -> Strapi admin
/api    -> Strapi API
/minio  -> MinIO Console
```

### Backend на ASP.NET

На первом этапе отдельный ASP.NET backend не нужен.

Его можно добавить позже, если появятся:

- заказы;
- статусы заказов;
- интеграции с Telegram / WhatsApp / CRM;
- онлайн-оплата;
- сложная бизнес-логика;
- личные кабинеты;
- отдельная административная логика вне Strapi.

Потенциальная будущая архитектура:

```text
Next.js -> ASP.NET API -> PostgreSQL / Strapi / внешние интеграции
```

---

## 3. Инфраструктура

Проект планируется деплоить на арендованный Linux-сервер.

Текущие характеристики сервера:

```text
2 vCPU
4 GB RAM
40 GB local disk
Docker уже установлен
```

Для такого сервера подходит компактный Docker Compose setup без Kubernetes и без микросервисной архитектуры.

Важно учитывать ограничения:

- 4 GB RAM достаточно для старта, но без большого запаса;
- 40 GB диска может быстро закончиться при большом количестве изображений;
- изображения желательно оптимизировать перед загрузкой;
- в будущем MinIO можно заменить на внешний S3-compatible storage.

---

## 4. Структура репозитория

Проект лучше хранить в одном репозитории.

```text
bakery-site/
  frontend/
    # Next.js приложение

  cms/
    # Strapi приложение

  infra/
    docker-compose.yml
    .env.example
    nginx/
      nginx.conf
      conf.d/
        bakery.conf

  README.md
```

Причины выбрать monorepo:

- frontend, CMS и инфраструктура связаны между собой;
- проще хранить Docker Compose рядом с проектом;
- проще описать единый запуск;
- проще поддерживать `.env.example`;
- удобнее деплоить весь проект на один сервер.

---

## 5. Модель данных в Strapi

### 5.1 Product

Товар в каталоге.

Поля:

```text
title: string
slug: uid
shortDescription: text
description: rich text
price: decimal / integer
priceOnRequest: boolean
weight: string
composition: text
allergens: text
shelfLife: string
productionTime: string
category: relation -> Category
images: media, multiple
isNew: boolean
isHit: boolean
isAvailable: boolean
sortOrder: integer
```

Назначение полей:

| Поле | Назначение |
|---|---|
| `title` | Название товара |
| `slug` | ЧПУ-адрес товара |
| `shortDescription` | Короткое описание для карточки |
| `description` | Полное описание товара |
| `price` | Цена |
| `priceOnRequest` | Флаг «цена по запросу» |
| `weight` | Вес или размер |
| `composition` | Состав |
| `allergens` | Аллергены |
| `shelfLife` | Срок хранения |
| `productionTime` | Срок изготовления |
| `category` | Категория товара |
| `images` | Фотографии товара |
| `isNew` | Новинка |
| `isHit` | Хит продаж |
| `isAvailable` | Доступен / нет в наличии |
| `sortOrder` | Ручная сортировка |

Флаги `isNew`, `isHit`, `isAvailable` добавляются сразу, даже если на первом этапе они не отображаются на сайте. Это позволит позже включить бейджи и фильтры без изменения структуры данных.

Логика отображения цены:

```text
если priceOnRequest = true:
  показывать «Цена по запросу»
иначе:
  показывать price
```

---

### 5.2 Category

Категория товаров.

Поля:

```text
title: string
slug: uid
description: text
image: media
sortOrder: integer
```

Примеры категорий:

- торты;
- пирожные;
- капкейки;
- десерты;
- наборы;
- сезонные предложения.

Категории используются для:

- группировки товаров;
- фильтрации каталога;
- SEO-страниц в будущем.

---

### 5.3 Promotion

Акция или специальное предложение.

Поля:

```text
title: string
slug: uid
shortDescription: text
description: rich text
image: media
startDate: date
endDate: date
isActive: boolean
sortOrder: integer
```

Логика отображения:

```text
показывать акцию, если:
  isActive = true
  и текущая дата между startDate и endDate
```

Если `startDate` или `endDate` не заполнены, можно считать акцию бессрочной.

---

### 5.4 Site Settings

Глобальные настройки сайта.

Лучше сделать как Single Type в Strapi.

Поля:

```text
siteName: string
phone: string
telegramUrl: string
whatsappUrl: string
address: text
mapEmbedUrl: text
workingHours: text
heroTitle: string
heroSubtitle: text
heroImage: media
aboutText: rich text
```

Используется для:

- главной страницы;
- контактов;
- шапки сайта;
- футера;
- блока «О нас».

---

## 6. Frontend-страницы

На первом этапе нужны следующие страницы.

### Главная

URL:

```text
/
```

Содержимое:

- hero-блок;
- краткое описание кондитерской;
- популярные категории;
- несколько товаров из каталога;
- активные акции;
- контакты.

### Каталог

URL:

```text
/catalog
```

Содержимое:

- список товаров;
- фильтр по категориям;
- отображение цены или «Цена по запросу»;
- фото товара;
- краткое описание.

### Страница товара

URL:

```text
/catalog/[slug]
```

Содержимое:

- фотографии;
- название;
- цена или «Цена по запросу»;
- описание;
- вес;
- состав;
- аллергены;
- срок хранения;
- срок изготовления;
- категория.

### Акции

URL:

```text
/promotions
```

Содержимое:

- список активных акций;
- изображения;
- сроки действия;
- описание.

### О нас

URL:

```text
/about
```

Содержимое редактируется через Strapi.

### Контакты

URL:

```text
/contacts
```

Содержимое:

- адрес;
- телефон;
- Telegram;
- WhatsApp;
- карта;
- режим работы.

---

## 7. Docker Compose services

Планируемые сервисы:

```text
nginx
frontend
strapi
postgres
minio
```

Примерная схема:

```text
client
  ↓
nginx
  ├── frontend:3000
  ├── strapi:1337
  └── minio:9001

strapi
  ├── postgres:5432
  └── minio:9000
```

---

## 8. Переменные окружения

Пример `.env.example`:

```env
# Common
NODE_ENV=production

# PostgreSQL
POSTGRES_DB=bakery
POSTGRES_USER=bakery_user
POSTGRES_PASSWORD=change_me

# Strapi
STRAPI_HOST=0.0.0.0
STRAPI_PORT=1337
STRAPI_APP_KEYS=change_me_1,change_me_2,change_me_3,change_me_4
STRAPI_API_TOKEN_SALT=change_me
STRAPI_ADMIN_JWT_SECRET=change_me
STRAPI_TRANSFER_TOKEN_SALT=change_me
STRAPI_JWT_SECRET=change_me

# Strapi database
DATABASE_CLIENT=postgres
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_NAME=bakery
DATABASE_USERNAME=bakery_user
DATABASE_PASSWORD=change_me
DATABASE_SSL=false

# MinIO
MINIO_ROOT_USER=change_me_admin
MINIO_ROOT_PASSWORD=change_me_strong_password
MINIO_BUCKET=bakery-media
MINIO_ENDPOINT=minio
MINIO_PORT=9000
MINIO_USE_SSL=false

# Frontend
NEXT_PUBLIC_SITE_URL=http://SERVER_IP
NEXT_PUBLIC_STRAPI_URL=http://SERVER_IP
STRAPI_API_URL=http://strapi:1337
```

Секреты нельзя коммитить в репозиторий.

В репозитории хранится только `.env.example`, а реальный `.env` создается на сервере вручную.

---

## 9. Nginx routing

Пока домена нет, сайт запускается по IPv4.

Пример маршрутизации:

```text
http://SERVER_IP/          -> frontend
http://SERVER_IP/admin     -> Strapi admin
http://SERVER_IP/api       -> Strapi API
http://SERVER_IP/minio     -> MinIO Console
```

Важно:

- HTTPS для нормального публичного сайта лучше настраивать после покупки домена;
- Let’s Encrypt обычно используется с доменом, а не просто с IP;
- до покупки домена можно временно использовать HTTP по IP;
- после покупки домена можно добавить HTTPS и заменить `SERVER_IP` на доменное имя.

---

## 10. MinIO

MinIO используется для хранения изображений.

План:

- поднять MinIO в Docker Compose;
- создать bucket `bakery-media`;
- настроить Strapi upload provider для S3-compatible storage;
- хранить изображения товаров и акций в MinIO.

MinIO Console должна быть доступна снаружи для администрирования.

Временный адрес:

```text
http://SERVER_IP/minio
```

Требования безопасности:

- использовать сложный `MINIO_ROOT_PASSWORD`;
- не использовать стандартные логин/пароль;
- не публиковать секреты в Git;
- после появления домена желательно закрыть MinIO Console отдельной авторизацией, VPN или хотя бы ограничением по IP.

---

## 11. HTTPS

На этапе запуска по IP:

```text
http://SERVER_IP
```

После покупки домена:

```text
https://example.ru
```

План после покупки домена:

1. Настроить DNS A-запись домена на IPv4 сервера.
2. Обновить Nginx config.
3. Выпустить Let’s Encrypt сертификат.
4. Включить редирект HTTP -> HTTPS.
5. Обновить переменные окружения:

```env
NEXT_PUBLIC_SITE_URL=https://example.ru
NEXT_PUBLIC_STRAPI_URL=https://example.ru
```

---

## 12. Порядок разработки

### Этап 1. Базовая инфраструктура

- создать репозиторий;
- создать структуру проекта;
- добавить Docker Compose;
- поднять PostgreSQL;
- поднять Strapi;
- поднять MinIO;
- поднять Next.js;
- настроить Nginx.

### Этап 2. CMS

- создать модели `Product`, `Category`, `Promotion`, `Site Settings`;
- настроить роли и права доступа;
- настроить загрузку изображений в MinIO;
- добавить тестовый контент.

### Этап 3. Frontend

- сверстать главную страницу;
- сверстать каталог;
- добавить фильтрацию по категориям;
- сверстать страницу товара;
- сверстать акции;
- сверстать страницу «О нас»;
- сверстать контакты.

### Этап 4. Deploy

- собрать Docker images;
- запустить проект на сервере;
- проверить публичный доступ по IP;
- проверить Strapi admin;
- проверить MinIO Console;
- проверить загрузку изображений;
- проверить отображение товаров на сайте.

---

## 13. Что можно добавить позже

### Онлайн-заказы

Возможные варианты:

- простая форма заказа;
- заказ через Telegram / WhatsApp;
- полноценная корзина;
- статусы заказа;
- уведомления сотрудникам.

При появлении сложной логики можно добавить ASP.NET backend.

### Блог / новости / рецепты

Можно добавить новые модели в Strapi:

```text
Article
Recipe
News
```

И новые frontend-страницы:

```text
/blog
/blog/[slug]
/recipes
/recipes/[slug]
```

### Домен и HTTPS

После покупки домена нужно настроить HTTPS и обновить конфигурацию окружения.

### Внешний S3

Если локального диска станет мало, MinIO можно заменить на внешний S3-compatible storage.

---

## 14. Итоговое решение

На первом этапе используется следующая архитектура:

```text
Next.js + Strapi + PostgreSQL + MinIO + Nginx + Docker Compose
```

Без отдельного ASP.NET backend.

Причина:

- сайт пока информационный;
- нет заказов;
- нет оплаты;
- нет личного кабинета;
- нет сложной бизнес-логики;
- весь контент удобно редактировать через Strapi.

ASP.NET backend можно добавить позже, когда появится реальная backend-логика.

