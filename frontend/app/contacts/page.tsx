import Link from "next/link";
import { getSiteSettings } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function ContactsPage() {
  const siteSettings = await getSiteSettings();

  return (
    <section className="section page-title">
      <p className="eyebrow">Контакты</p>
      <h1>Свяжитесь с кондитерской</h1>
      <p>Пока заявки через сайт не планируются, поэтому основной сценарий - телефон и мессенджеры.</p>

      <div className="grid">
        <article className="card">
          <div className="card-body">
            <h3>Адрес</h3>
            <p>{siteSettings.address}</p>
          </div>
        </article>
        <article className="card">
          <div className="card-body">
            <h3>Телефон</h3>
            <p>{siteSettings.phone}</p>
          </div>
        </article>
        <article className="card">
          <div className="card-body">
            <h3>Режим работы</h3>
            <p>{siteSettings.workingHours}</p>
          </div>
        </article>
      </div>

      <div className="actions">
        <Link className="button button-primary" href={siteSettings.telegramUrl}>
          Telegram
        </Link>
        <Link className="button button-muted" href={siteSettings.whatsappUrl}>
          WhatsApp
        </Link>
      </div>
    </section>
  );
}
