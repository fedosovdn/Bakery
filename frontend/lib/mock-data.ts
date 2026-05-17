import type { Category, Product, Promotion, SiteSettings } from "./types";

export const siteSettings: SiteSettings = {
  siteName: "Bakery Site",
  phone: "+7 900 000-00-00",
  telegramUrl: "https://t.me/",
  whatsappUrl: "https://wa.me/",
  address: "Москва, ул. Сладкая, 12",
  mapEmbedUrl: "",
  workingHours: "Ежедневно с 9:00 до 21:00",
  heroTitle: "Десерты, которые делают день теплее",
  heroSubtitle:
    "Готовим торты, пирожные и сладкие наборы на заказ из понятных ингредиентов и с вниманием к деталям.",
  heroImage:
    "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1800&q=85",
  aboutText:
    "Мы небольшая кондитерская, где каждый десерт собирается вручную. Нам важно, чтобы вкус был честным, внешний вид аккуратным, а заказ приезжал вовремя."
};

export const categories: Category[] = [
  {
    title: "Торты",
    slug: "cakes",
    description: "Классические и современные торты для семейных праздников.",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=85",
    sortOrder: 10
  },
  {
    title: "Пирожные",
    slug: "pastries",
    description: "Порционные десерты для кофе, витрины и небольших подарков.",
    image:
      "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=900&q=85",
    sortOrder: 20
  },
  {
    title: "Капкейки",
    slug: "cupcakes",
    description: "Нежные капкейки с кремом, ягодами и праздничным декором.",
    image:
      "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=900&q=85",
    sortOrder: 30
  },
  {
    title: "Наборы",
    slug: "sets",
    description: "Сладкие боксы для подарков, мероприятий и уютных вечеров.",
    image:
      "https://images.unsplash.com/photo-1599785209707-a456fc1337bb?auto=format&fit=crop&w=900&q=85",
    sortOrder: 40
  }
];

export const products: Product[] = [
  {
    title: "Медовик с карамельным кремом",
    slug: "honey-cake-caramel",
    shortDescription: "Мягкие медовые коржи, сметанный крем и легкая карамель.",
    description:
      "Домашний медовик с тонкими коржами, пропитанным кремом и спокойной карамельной нотой. Хорошо подходит для семейного праздника.",
    price: 2400,
    priceOnRequest: false,
    weight: "1.2 кг",
    composition: "Мед, мука, яйца, сливочное масло, сметана, сахар",
    allergens: "Глютен, яйца, молочные продукты",
    shelfLife: "72 часа",
    productionTime: "2 дня",
    categorySlug: "cakes",
    images: [
      "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=1000&q=85"
    ],
    isNew: false,
    isHit: true,
    isAvailable: true,
    sortOrder: 10
  },
  {
    title: "Шоколадный торт с вишней",
    slug: "chocolate-cherry-cake",
    shortDescription: "Насыщенный шоколадный бисквит и вишневая начинка.",
    description:
      "Плотный шоколадный торт с ягодной кислинкой и сливочным кремом. Можно адаптировать декор под событие.",
    price: 2800,
    priceOnRequest: false,
    weight: "1.4 кг",
    composition: "Какао, мука, яйца, сливки, вишня, сахар",
    allergens: "Глютен, яйца, молочные продукты",
    shelfLife: "72 часа",
    productionTime: "2 дня",
    categorySlug: "cakes",
    images: [
      "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=1000&q=85"
    ],
    isNew: true,
    isHit: false,
    isAvailable: true,
    sortOrder: 20
  },
  {
    title: "Эклеры с ванильным кремом",
    slug: "vanilla-eclairs",
    shortDescription: "Заварное тесто, ванильный крем и тонкая глазурь.",
    description:
      "Набор классических эклеров с нежным кремом. Удобный формат для офиса, праздника или небольшой встречи.",
    price: 900,
    priceOnRequest: false,
    weight: "6 штук",
    composition: "Мука, яйца, молоко, сливочное масло, ваниль",
    allergens: "Глютен, яйца, молочные продукты",
    shelfLife: "48 часов",
    productionTime: "1 день",
    categorySlug: "pastries",
    images: [
      "https://images.unsplash.com/photo-1612201142855-7873bc1661b4?auto=format&fit=crop&w=1000&q=85"
    ],
    isNew: false,
    isHit: true,
    isAvailable: true,
    sortOrder: 30
  },
  {
    title: "Капкейки для праздника",
    slug: "party-cupcakes",
    shortDescription: "Набор капкейков с индивидуальным оформлением.",
    description:
      "Капкейки с кремовыми шапочками, посыпками и сезонными ягодами. Цвет и оформление обсуждаются перед заказом.",
    price: null,
    priceOnRequest: true,
    weight: "от 12 штук",
    composition: "Бисквит, сливочный крем, ягоды, декор",
    allergens: "Глютен, яйца, молочные продукты",
    shelfLife: "48 часов",
    productionTime: "2-3 дня",
    categorySlug: "cupcakes",
    images: [
      "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=1000&q=85"
    ],
    isNew: true,
    isHit: false,
    isAvailable: true,
    sortOrder: 40
  },
  {
    title: "Подарочный набор десертов",
    slug: "dessert-gift-set",
    shortDescription: "Ассорти мини-десертов в аккуратной упаковке.",
    description:
      "Сладкий набор с мини-пирожными, капкейками и сезонным декором. Подходит для подарка или небольшого события.",
    price: 1900,
    priceOnRequest: false,
    weight: "8-10 позиций",
    composition: "Бисквит, крем, шоколад, ягоды, орехи",
    allergens: "Глютен, яйца, молочные продукты, орехи",
    shelfLife: "48 часов",
    productionTime: "2 дня",
    categorySlug: "sets",
    images: [
      "https://images.unsplash.com/photo-1599785209707-a456fc1337bb?auto=format&fit=crop&w=1000&q=85"
    ],
    isNew: false,
    isHit: true,
    isAvailable: true,
    sortOrder: 50
  }
];

export const promotions: Promotion[] = [
  {
    title: "Сладкий сет к выходным",
    slug: "weekend-dessert-set",
    shortDescription: "Минус 10% на наборы из мини-десертов по пятницам.",
    description:
      "Каждую пятницу собираем ограниченную партию десертных сетов для спокойных домашних вечеров и встреч с друзьями.",
    image:
      "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=1000&q=85",
    startDate: null,
    endDate: null,
    isActive: true,
    sortOrder: 10
  },
  {
    title: "Праздничный декор в подарок",
    slug: "free-party-decor",
    shortDescription: "При заказе торта от 2 кг добавим базовый декор бесплатно.",
    description:
      "Подберем цветовую гамму и аккуратные декоративные детали под ваш праздник.",
    image:
      "https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&w=1000&q=85",
    startDate: null,
    endDate: null,
    isActive: true,
    sortOrder: 20
  }
];

export function formatPrice(product: Product) {
  if (product.priceOnRequest || product.price === null) {
    return "Цена по запросу";
  }

  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0
  }).format(product.price);
}

export function getCategoryTitle(slug: string) {
  return categories.find((category) => category.slug === slug)?.title ?? "Каталог";
}
