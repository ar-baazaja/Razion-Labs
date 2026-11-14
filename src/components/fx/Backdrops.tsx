"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

/* WebGL backgrounds are code-split and only load in the browser. */
const Orb = dynamic(() => import("../reactbits/Orb"), { ssr: false });
const Threads = dynamic(() => import("../reactbits/Threads"), { ssr: false });

/** Pause when the visitor switches motion off in the footer. */
function useMotionOff() {
  const [off, setOff] = useState(false);
  useEffect(() => {
    const read = () => setOff(document.documentElement.classList.contains("motion-off"));
    read();
    window.addEventListener("rl:motion", read);
    return () => window.removeEventListener("rl:motion", read);
  }, []);
  return off;
}

/** Glowing AI orb in brand turquoise and blue (hero). */
export function HeroOrb() {
  const off = useMotionOff();
  return (
    <div className="backdrop backdrop--orb" aria-hidden="true">
      <Orb colors={["#20d6c7", "#5b8cff", "#0b3a46"]} backgroundColor="#0b1113" size={0.95} glow={1.15} hoverIntensity={0.6} paused={off} />
    </div>
  );
}

/** Flowing threads that part around the cursor (call-to-action banner). */
export function BannerThreads() {
  const off = useMotionOff();
  return (
    <div className="backdrop backdrop--threads" aria-hidden="true">
      <Threads color="#20d6c7" accentColor="#5b8cff" amplitude={1} distance={0.2} enableMouseInteraction parting={0.6} brightness={1.2} paused={off} />
    </div>
  );
}
