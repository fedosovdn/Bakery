export type Category = {
  title: string;
  slug: string;
  description: string;
  image: string;
  sortOrder: number;
};

export type Product = {
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  price: number | null;
  priceOnRequest: boolean;
  weight: string;
  composition: string;
  allergens: string;
  shelfLife: string;
  productionTime: string;
  categorySlug: string;
  categoryTitle?: string;
  images: string[];
  isNew: boolean;
  isHit: boolean;
  isAvailable: boolean;
  sortOrder: number;
};

export type Promotion = {
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  image: string;
  startDate: string | null;
  endDate: string | null;
  isActive: boolean;
  sortOrder: number;
};

export type SiteSettings = {
  siteName: string;
  phone: string;
  telegramUrl: string;
  whatsappUrl: string;
  address: string;
  mapEmbedUrl: string;
  workingHours: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  aboutText: string;
};
