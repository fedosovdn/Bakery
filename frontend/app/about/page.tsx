import Image from "next/image";
import { getSiteSettings } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const siteSettings = await getSiteSettings();

  return (
    <section className="section">
      <div className="split">
        <div className="split-copy">
          <p className="eyebrow">О нас</p>
          <h1>Небольшая кондитерская с вниманием к деталям</h1>
          <p>{siteSettings.aboutText}</p>
          <p>Этот текст редактируется через Strapi Single Type `Site Settings`.</p>
        </div>
        <div className="split-image">
          <Image
            src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1100&q=85"
            alt="Рабочий стол кондитера"
            width={1100}
            height={900}
          />
        </div>
      </div>
    </section>
  );
}
