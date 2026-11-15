import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="logo" aria-label="Razion Labs, home">
      <Image
        className="logo__img"
        src="/razion-labs-logo.png"
        alt=""
        width={587}
        height={160}
        priority
      />
    </Link>
  );
}
