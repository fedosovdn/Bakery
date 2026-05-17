import {
  categories as fallbackCategories,
  products as fallbackProducts,
  promotions as fallbackPromotions,
  siteSettings as fallbackSiteSettings
} from "./mock-data";
import type { Category, Product, Promotion, SiteSettings } from "./types";

const STRAPI_API_URL = process.env.STRAPI_API_URL ?? "http://localhost:1337";
const PUBLIC_STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";

type StrapiListResponse<T> = {
  data: T[];
};

type StrapiSingleResponse<T> = {
  data: T | null;
};

type StrapiMedia = {
  url?: string | null;
};

type StrapiCategory = {
  title?: string | null;
  slug?: string | null;
  description?: string | null;
  image?: StrapiMedia | null;
  sortOrder?: number | null;
};

type StrapiProduct = {
  title?: string | null;
  slug?: string | null;
  shortDescription?: string | null;
  description?: string | null;
  price?: number | string | null;
  priceOnRequest?: boolean | null;
  weight?: string | null;
  composition?: string | null;
  allergens?: string | null;
  shelfLife?: string | null;
  productionTime?: string | null;
  category?: StrapiCategory | null;
  images?: StrapiMedia[] | null;
  isNew?: boolean | null;
  isHit?: boolean | null;
  isAvailable?: boolean | null;
  sortOrder?: number | null;
};

type StrapiPromotion = {
  title?: string | null;
  slug?: string | null;
  shortDescription?: string | null;
  description?: string | null;
  image?: StrapiMedia | null;
  startDate?: string | null;
  endDate?: string | null;
  isActive?: boolean | null;
  sortOrder?: number | null;
};

type StrapiSiteSettings = {
  siteName?: string | null;
  phone?: string | null;
  telegramUrl?: string | null;
  whatsappUrl?: string | null;
  address?: string | null;
  mapEmbedUrl?: string | null;
  workingHours?: string | null;
  heroTitle?: string | null;
  heroSubtitle?: string | null;
  heroImage?: StrapiMedia | null;
  aboutText?: string | null;
};

async function fetchFromStrapi<T>(path: string): Promise<T> {
  const response = await fetch(`${STRAPI_API_URL}${path}`, {
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`Strapi request failed: ${response.status} ${path}`);
  }

  return response.json() as Promise<T>;
}

function mediaUrl(media: StrapiMedia | null | undefined, fallback: string) {
  if (!media?.url) {
    return fallback;
  }

  if (media.url.startsWith("http")) {
    return media.url;
  }

  return `${PUBLIC_STRAPI_URL}${media.url}`;
}

function sortByOrder<T extends { sortOrder: number }>(items: T[]) {
  return [...items].sort((left, right) => left.sortOrder - right.sortOrder);
}

function mapCategory(category: StrapiCategory, index: number): Category {
  const fallback = fallbackCategories[index] ?? fallbackCategories[0];

  return {
    title: category.title ?? fallback.title,
    slug: category.slug ?? fallback.slug,
    description: category.description ?? fallback.description,
    image: mediaUrl(category.image, fallback.image),
    sortOrder: category.sortOrder ?? fallback.sortOrder
  };
}

function mapProduct(product: StrapiProduct, index: number): Product {
  const fallback = fallbackProducts[index] ?? fallbackProducts[0];
  const price = product.price === null || product.price === undefined ? fallback.price : Number(product.price);

  return {
    title: product.title ?? fallback.title,
    slug: product.slug ?? fallback.slug,
    shortDescription: product.shortDescription ?? fallback.shortDescription,
    description: product.description ?? fallback.description,
    price: Number.isFinite(price) ? price : fallback.price,
    priceOnRequest: product.priceOnRequest ?? fallback.priceOnRequest,
    weight: product.weight ?? fallback.weight,
    composition: product.composition ?? fallback.composition,
    allergens: product.allergens ?? fallback.allergens,
    shelfLife: product.shelfLife ?? fallback.shelfLife,
    productionTime: product.productionTime ?? fallback.productionTime,
    categorySlug: product.category?.slug ?? fallback.categorySlug,
    categoryTitle: product.category?.title ?? undefined,
    images:
      product.images && product.images.length > 0
        ? product.images.map((image, imageIndex) => mediaUrl(image, fallback.images[imageIndex] ?? fallback.images[0]))
        : fallback.images,
    isNew: product.isNew ?? fallback.isNew,
    isHit: product.isHit ?? fallback.isHit,
    isAvailable: product.isAvailable ?? fallback.isAvailable,
    sortOrder: product.sortOrder ?? fallback.sortOrder
  };
}

function mapPromotion(promotion: StrapiPromotion, index: number): Promotion {
  const fallback = fallbackPromotions[index] ?? fallbackPromotions[0];

  return {
    title: promotion.title ?? fallback.title,
    slug: promotion.slug ?? fallback.slug,
    shortDescription: promotion.shortDescription ?? fallback.shortDescription,
    description: promotion.description ?? fallback.description,
    image: mediaUrl(promotion.image, fallback.image),
    startDate: promotion.startDate ?? fallback.startDate,
    endDate: promotion.endDate ?? fallback.endDate,
    isActive: promotion.isActive ?? fallback.isActive,
    sortOrder: promotion.sortOrder ?? fallback.sortOrder
  };
}

function mapSiteSettings(settings: StrapiSiteSettings | null): SiteSettings {
  if (!settings) {
    return fallbackSiteSettings;
  }

  return {
    siteName: settings.siteName ?? fallbackSiteSettings.siteName,
    phone: settings.phone ?? fallbackSiteSettings.phone,
    telegramUrl: settings.telegramUrl ?? fallbackSiteSettings.telegramUrl,
    whatsappUrl: settings.whatsappUrl ?? fallbackSiteSettings.whatsappUrl,
    address: settings.address ?? fallbackSiteSettings.address,
    mapEmbedUrl: settings.mapEmbedUrl ?? fallbackSiteSettings.mapEmbedUrl,
    workingHours: settings.workingHours ?? fallbackSiteSettings.workingHours,
    heroTitle: settings.heroTitle ?? fallbackSiteSettings.heroTitle,
    heroSubtitle: settings.heroSubtitle ?? fallbackSiteSettings.heroSubtitle,
    heroImage: mediaUrl(settings.heroImage, fallbackSiteSettings.heroImage),
    aboutText: settings.aboutText ?? fallbackSiteSettings.aboutText
  };
}

export async function getSiteSettings() {
  try {
    const response = await fetchFromStrapi<StrapiSingleResponse<StrapiSiteSettings>>(
      "/api/site-setting?populate=heroImage"
    );

    return mapSiteSettings(response.data);
  } catch {
    return fallbackSiteSettings;
  }
}

export async function getCategories() {
  try {
    const response = await fetchFromStrapi<StrapiListResponse<StrapiCategory>>(
      "/api/categories?populate=image&sort=sortOrder:asc"
    );

    return sortByOrder(response.data.map(mapCategory));
  } catch {
    return fallbackCategories;
  }
}

export async function getProducts() {
  try {
    const response = await fetchFromStrapi<StrapiListResponse<StrapiProduct>>(
      "/api/products?populate=category&populate=images&sort=sortOrder:asc"
    );

    return sortByOrder(response.data.map(mapProduct));
  } catch {
    return fallbackProducts;
  }
}

export async function getProductBySlug(slug: string) {
  const products = await getProducts();

  return products.find((product) => product.slug === slug) ?? null;
}

export async function getPromotions() {
  try {
    const response = await fetchFromStrapi<StrapiListResponse<StrapiPromotion>>(
      "/api/promotions?populate=image&filters[isActive][$eq]=true&sort=sortOrder:asc"
    );

    return sortByOrder(response.data.map(mapPromotion));
  } catch {
    return fallbackPromotions;
  }
}

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

export function getCategoryTitle(product: Product) {
  return product.categoryTitle ?? product.categorySlug;
}
