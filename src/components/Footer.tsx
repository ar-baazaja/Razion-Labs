import Link from "next/link";
import { footerNav, site } from "@/content/site";
import { Logo } from "./Logo";
import { Wordmark } from "./motion/Wordmark";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <Logo />
            <a href={`mailto:${site.email}`} className="footer-mail">
              {site.email}
            </a>
          </div>
          <div className="footer-cols">
            {footerNav.map((col) => (
              <nav key={col.title} aria-label={`${col.title} links`}>
                <h2>{col.title}</h2>
                <ul>
                  {col.items.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href}>{item.label}</Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {site.legalName}
          </span>
        </div>
      </div>
      <Wordmark />
    </footer>
  );
}
