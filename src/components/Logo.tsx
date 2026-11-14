import Link from "next/link";

/** Mark: three event nodes joined by one path — a process in its smallest form, drawn as an R. */
export function LogoMark({ className = "logo__mark" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 26 26" aria-hidden="true" focusable="false">
      <rect x="0.5" y="0.5" width="25" height="25" rx="5" fill="none" stroke="currentColor" strokeOpacity="0.35" />
      <path
        d="M7 19V7h7a3.5 3.5 0 0 1 0 7H7m7 0 5 5"
        fill="none"
        stroke="#20D6C7"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="7" cy="7" r="1.9" fill="#F3F7F7" />
      <circle cx="7" cy="19" r="1.9" fill="#F3F7F7" />
      <circle cx="19" cy="19" r="1.9" fill="#20D6C7" />
    </svg>
  );
}

export function Logo() {
  return (
    <Link href="/" className="logo" aria-label="Razion Labs, home">
      <LogoMark />
      <span aria-hidden="true">
        Razion <span className="logo__labs">Labs</span>
      </span>
    </Link>
  );
}
