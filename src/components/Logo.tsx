import Image from "next/image";
import Link from "next/link";

/** Both versions are rendered; CSS shows the one that matches the theme. */
export function Logo() {
  return (
    <Link href="/" className="logo" aria-label="Razion Labs, home">
      <Image className="logo__img logo__img--light" src="/logo-razion-labs.png" alt="" width={587} height={160} priority />
      <Image className="logo__img logo__img--dark" src="/logo-razion-labs-dark.png" alt="" width={587} height={160} priority />
    </Link>
  );
}
