import type { Core } from '@strapi/strapi';

const PUBLIC_READ_ACTIONS = [
  'api::category.category.find',
  'api::category.category.findOne',
  'api::product.product.find',
  'api::product.product.findOne',
  'api::promotion.promotion.find',
  'api::promotion.promotion.findOne',
  'api::site-setting.site-setting.find',
] as const;

async function ensurePublicReadPermissions(strapi: Core.Strapi) {
  const publicRole = await strapi.db.query('plugin::users-permissions.role').findOne({
    where: { type: 'public' },
  });

  if (!publicRole) {
    strapi.log.warn('Public role was not found; skipping public read permissions setup.');
    return;
  }

  const permissionQuery = strapi.db.query('plugin::users-permissions.permission');

  for (const action of PUBLIC_READ_ACTIONS) {
    const existingPermission = await permissionQuery.findOne({
      where: {
        action,
        role: publicRole.id,
      },
    });

    if (!existingPermission) {
      await permissionQuery.create({
        data: {
          action,
          role: publicRole.id,
        },
      });
    }
  }
}

async function seedContent(strapi: Core.Strapi) {
  const categoryDocuments = strapi.documents('api::category.category');
  const productDocuments = strapi.documents('api::product.product');
  const promotionDocuments = strapi.documents('api::promotion.promotion');
  const siteSettingDocuments = strapi.documents('api::site-setting.site-setting');

  const existingCategories = await categoryDocuments.findMany({ limit: 1 });

  if (existingCategories.length > 0) {
    return;
  }

  const cakes = await categoryDocuments.create({
    status: 'published',
    data: {
      title: 'Торты',
      slug: 'cakes',
      description: 'Классические и современные торты для семейных праздников.',
      sortOrder: 10,
    },
  });

  const pastries = await categoryDocuments.create({
    status: 'published',
    data: {
      title: 'Пирожные',
      slug: 'pastries',
      description: 'Порционные десерты для кофе, витрины и небольших подарков.',
      sortOrder: 20,
    },
  });

  await categoryDocuments.create({
    status: 'published',
    data: {
      title: 'Капкейки',
      slug: 'cupcakes',
      description: 'Нежные капкейки с кремом, ягодами и праздничным декором.',
      sortOrder: 30,
    },
  });

  await categoryDocuments.create({
    status: 'published',
    data: {
      title: 'Наборы',
      slug: 'sets',
      description: 'Сладкие боксы для подарков, мероприятий и уютных вечеров.',
      sortOrder: 40,
    },
  });

  await productDocuments.create({
    status: 'published',
    data: {
      title: 'Медовик с карамельным кремом',
      slug: 'honey-cake-caramel',
      shortDescription: 'Мягкие медовые коржи, сметанный крем и легкая карамель.',
      description:
        'Домашний медовик с тонкими коржами, пропитанным кремом и спокойной карамельной нотой.',
      price: 2400,
      priceOnRequest: false,
      weight: '1.2 кг',
      composition: 'Мед, мука, яйца, сливочное масло, сметана, сахар',
      allergens: 'Глютен, яйца, молочные продукты',
      shelfLife: '72 часа',
      productionTime: '2 дня',
      category: cakes.documentId,
      isNew: false,
      isHit: true,
      isAvailable: true,
      sortOrder: 10,
    },
  });

  await productDocuments.create({
    status: 'published',
    data: {
      title: 'Эклеры с ванильным кремом',
      slug: 'vanilla-eclairs',
      shortDescription: 'Заварное тесто, ванильный крем и тонкая глазурь.',
      description: 'Набор классических эклеров с нежным кремом. Удобный формат для офиса.',
      price: 900,
      priceOnRequest: false,
      weight: '6 штук',
      composition: 'Мука, яйца, молоко, сливочное масло, ваниль',
      allergens: 'Глютен, яйца, молочные продукты',
      shelfLife: '48 часов',
      productionTime: '1 день',
      category: pastries.documentId,
      isNew: false,
      isHit: true,
      isAvailable: true,
      sortOrder: 20,
    },
  });

  await promotionDocuments.create({
    status: 'published',
    data: {
      title: 'Сладкий сет к выходным',
      slug: 'weekend-dessert-set',
      shortDescription: 'Минус 10% на наборы из мини-десертов по пятницам.',
      description:
        'Каждую пятницу собираем ограниченную партию десертных сетов для спокойных домашних вечеров.',
      isActive: true,
      sortOrder: 10,
    },
  });

  await siteSettingDocuments.create({
    status: 'published',
    data: {
      siteName: 'Bakery Site',
      phone: '+7 900 000-00-00',
      telegramUrl: 'https://t.me/',
      whatsappUrl: 'https://wa.me/',
      address: 'Москва, ул. Сладкая, 12',
      workingHours: 'Ежедневно с 9:00 до 21:00',
      heroTitle: 'Десерты, которые делают день теплее',
      heroSubtitle:
        'Готовим торты, пирожные и сладкие наборы на заказ из понятных ингредиентов.',
      aboutText:
        'Мы небольшая кондитерская, где каждый десерт собирается вручную и готовится с вниманием к деталям.',
    },
  });
}

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register() {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await ensurePublicReadPermissions(strapi);
    await seedContent(strapi);
  },
};
