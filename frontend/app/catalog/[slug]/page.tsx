import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPrice, getCategoryTitle, getProductBySlug } from "@/lib/content";

export const dynamic = "force-dynamic";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const details = [
    ["Категория", getCategoryTitle(product)],
    ["Вес или размер", product.weight],
    ["Состав", product.composition],
    ["Аллергены", product.allergens],
    ["Срок хранения", product.shelfLife],
    ["Срок изготовления", product.productionTime]
  ];

  return (
    <section className="section">
      <div className="split">
        <div className="split-image">
          <Image
            src={product.images[0]}
            alt={product.title}
            width={1100}
            height={900}
            priority
          />
        </div>
        <div className="split-copy">
          <p className="eyebrow">{getCategoryTitle(product)}</p>
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <div className="price-row">
            <span className="price">{formatPrice(product)}</span>
            {product.isAvailable ? <span className="badge">Доступен</span> : <span className="badge">Нет в наличии</span>}
          </div>
          <div className="details">
            {details.map(([label, value]) => (
              <div className="detail" key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
          <div className="actions">
            <Link className="button button-primary" href="/contacts">
              Заказать через контакты
            </Link>
            <Link className="button button-muted" href="/catalog">
              Назад в каталог
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
