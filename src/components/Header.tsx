"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useId, useState } from "react";
import { primaryNav } from "@/content/site";
import { Logo } from "./Logo";

const EASE = [0.2, 0.7, 0.2, 1] as const;

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hover, setHover] = useState<string | null>(null);
  const menuId = useId();
  const { scrollY } = useScroll();

  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > 240 && y > prev && !open);
  });

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.documentElement.classList.add("menu-open");
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.classList.remove("menu-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isCurrent = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <motion.header
        className={`site-header${scrolled ? " is-scrolled" : ""}`}
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.35, ease: EASE }}
        // Keyboard users must always reach the header.
        onFocusCapture={() => setHidden(false)}
      >
        <div className="wrap site-header__inner">
          <Logo />
          <nav className="nav" aria-label="Primary" onPointerLeave={() => setHover(null)}>
            <ul>
              {primaryNav.map((item) => (
                <li key={item.href} onPointerEnter={() => setHover(item.href)}>
                  <Link href={item.href} aria-current={isCurrent(item.href) ? "page" : undefined}>
                    {hover === item.href && (
                      <motion.span layoutId="nav-hover" className="nav__pill" transition={{ type: "spring", stiffness: 500, damping: 38 }} />
                    )}
                    <span className="nav__label">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Link href="/contact" className="btn btn--primary btn--sm site-header__cta" data-track="header_discuss_project">
            Discuss a project
          </Link>
          <button
            type="button"
            className="menu-btn"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="menu-btn__icon" aria-hidden="true" />
            <span className="visually-hidden">{open ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id={menuId}
            className="mobile-nav"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <nav aria-label="Mobile">
              <ul>
                {[...primaryNav, { href: "/contact", label: "Contact" }].map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.06, duration: 0.5, ease: EASE }}
                  >
                    <Link className="mobile-nav__link" href={item.href} aria-current={isCurrent(item.href) ? "page" : undefined}>
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
