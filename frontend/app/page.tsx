import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { getCategories, getProducts, getPromotions, getSiteSettings } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [siteSettings, categories, products, promotions] = await Promise.all([
    getSiteSettings(),
    getCategories(),
    getProducts(),
    getPromotions()
  ]);
  const featuredProducts = products.slice(0, 3);
  const featuredPromotions = promotions.filter((promotion) => promotion.isActive).slice(0, 2);

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">Кондитерская ручной работы</p>
          <h1>{siteSettings.heroTitle}</h1>
          <p>{siteSettings.heroSubtitle}</p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/catalog">
              Смотреть каталог
            </Link>
            <Link className="button button-secondary" href="/contacts">
              Связаться
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Категории</p>
            <h2>Собрали основные сладкие поводы</h2>
            <p>Торты, пирожные, капкейки и наборы редактируются через Strapi.</p>
          </div>
          <Link className="button button-muted" href="/catalog">
            В каталог
          </Link>
        </div>
        <div className="grid">
          {categories.slice(0, 3).map((category) => (
            <article className="card" key={category.slug}>
              <Image
                className="card-image"
                src={category.image}
                alt={category.title}
                width={800}
                height={600}
              />
              <div className="card-body">
                <h3>{category.title}</h3>
                <p>{category.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-tight">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Популярное</p>
            <h2>Позиции из каталога</h2>
          </div>
          <Link className="button button-muted" href="/catalog">
            Все товары
          </Link>
        </div>
        <div className="grid">
          {featuredProducts.map((product) => (
            <ProductCard product={product} key={product.slug} />
          ))}
        </div>
      </section>

      <section className="section contact-band">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Акции</p>
            <h2>Специальные предложения</h2>
            <p>Показываем активные акции из CMS, с fallback на локальные данные.</p>
          </div>
        </div>
        <div className="grid">
          {featuredPromotions.map((promotion) => (
            <article className="card" key={promotion.slug}>
              <Image
                className="card-image"
                src={promotion.image}
                alt={promotion.title}
                width={800}
                height={600}
              />
              <div className="card-body">
                <h3>{promotion.title}</h3>
                <p>{promotion.shortDescription}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
