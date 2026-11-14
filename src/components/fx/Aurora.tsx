/** Soft, slowly drifting gradient light (CSS only). Decorative. */
export function Aurora({ variant = "hero" }: { variant?: "hero" | "panel" | "soft" }) {
  return (
    <div className={`aurora aurora--${variant}`} aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  );
}
