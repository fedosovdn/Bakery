import Image from "next/image";
import { getPromotions } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function PromotionsPage() {
  const promotions = await getPromotions();
  const activePromotions = promotions.filter((promotion) => promotion.isActive);

  return (
    <section className="section page-title">
      <p className="eyebrow">Акции</p>
      <h1>Активные предложения</h1>
      <p>Акции с пустыми датами считаются бессрочными, как описано в README.</p>

      {activePromotions.length > 0 ? (
        <div className="grid">
          {activePromotions.map((promotion) => (
            <article className="card" key={promotion.slug}>
              <Image
                className="card-image"
                src={promotion.image}
                alt={promotion.title}
                width={800}
                height={600}
              />
              <div className="card-body">
                <span className="badge">Активно</span>
                <h3>{promotion.title}</h3>
                <p>{promotion.description}</p>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">Сейчас нет активных акций.</div>
      )}
    </section>
  );
}
