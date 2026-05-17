import Image from "next/image";
import Link from "next/link";
import { formatPrice, getCategoryTitle } from "@/lib/content";
import type { Product } from "@/lib/types";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="card">
      <Link href={`/catalog/${product.slug}`}>
        <Image
          className="card-image"
          src={product.images[0]}
          alt={product.title}
          width={800}
          height={600}
        />
      </Link>
      <div className="card-body">
        <span className="badge">{getCategoryTitle(product)}</span>
        <h3>
          <Link href={`/catalog/${product.slug}`}>{product.title}</Link>
        </h3>
        <p>{product.shortDescription}</p>
        <div className="price-row">
          <span className="price">{formatPrice(product)}</span>
          {product.isHit ? <span className="badge">Хит</span> : null}
        </div>
      </div>
    </article>
  );
}
