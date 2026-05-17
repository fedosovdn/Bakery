import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { getCategories, getProducts } from "@/lib/content";

export const dynamic = "force-dynamic";

type CatalogPageProps = {
  searchParams?: Promise<{
    category?: string;
  }>;
};

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);
  const params = await searchParams;
  const activeCategory = params?.category;
  const visibleProducts = activeCategory
    ? products.filter((product) => product.categorySlug === activeCategory)
    : products;

  return (
    <section className="section page-title">
      <p className="eyebrow">Каталог</p>
      <h1>Десерты и сладкие наборы</h1>
      <p>Фильтр по категориям работает поверх данных из CMS.</p>

      <div className="category-list">
        <Link
          className={`category-link ${!activeCategory ? "category-link-active" : ""}`}
          href="/catalog"
        >
          Все
        </Link>
        {categories.map((category) => (
          <Link
            className={`category-link ${
              activeCategory === category.slug ? "category-link-active" : ""
            }`}
            href={`/catalog?category=${category.slug}`}
            key={category.slug}
          >
            {category.title}
          </Link>
        ))}
      </div>

      {visibleProducts.length > 0 ? (
        <div className="grid">
          {visibleProducts.map((product) => (
            <ProductCard product={product} key={product.slug} />
          ))}
        </div>
      ) : (
        <div className="empty-state">В этой категории пока нет опубликованных товаров.</div>
      )}
    </section>
  );
}
