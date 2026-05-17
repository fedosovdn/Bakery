import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bakery Site",
  description: "Информационный сайт небольшой кондитерской"
};

const navItems = [
  { href: "/", label: "Главная" },
  { href: "/catalog", label: "Каталог" },
  { href: "/promotions", label: "Акции" },
  { href: "/about", label: "О нас" },
  { href: "/contacts", label: "Контакты" }
];

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <div className="site-shell">
          <header className="site-header">
            <div className="header-inner">
              <Link className="brand" href="/">
                <span>Bakery Site</span>
                <span>кондитерская ручной работы</span>
              </Link>
              <nav className="nav" aria-label="Основная навигация">
                {navItems.map((item) => (
                  <Link href={item.href} key={item.href}>
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </header>
          <main className="main">{children}</main>
          <footer className="site-footer">
            <div className="footer-inner">
              <span>Bakery Site</span>
              <span>Торты, десерты и сладкие наборы на заказ</span>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
