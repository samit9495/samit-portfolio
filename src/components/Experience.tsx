import { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import Lenis from "lenis";
import { Journey } from "./canvas/Journey";
import { CanvasBoundary } from "./canvas/CanvasFallback";
import { Overlay } from "./Overlay";
import { useStore } from "../store/useStore";
import { useAudio } from "../hooks/useAudio";
import { identity } from "../data/site";

export default function Experience() {
  const setScroll = useStore((s) => s.setScroll);
  const setActive = useStore((s) => s.setActive);
  const setPanel = useStore((s) => s.setPanel);
  const setScrollToId = useStore((s) => s.setScrollToId);
  const setAudioOn = useStore((s) => s.setAudioOn);
  useAudio();

  // the static landing's sound toggle talks to the store via this event
  useEffect(() => {
    const h = (e: Event) => setAudioOn(!!(e as CustomEvent).detail);
    window.addEventListener("audio:set", h as EventListener);
    return () => window.removeEventListener("audio:set", h as EventListener);
  }, [setAudioOn]);

  // tell the static preloader the experience is mounted and interactive,
  // then honor any deep-link hash (e.g. /#trulla) once content exists
  useEffect(() => {
    const id = requestAnimationFrame(() =>
      window.dispatchEvent(new Event("experience:ready")),
    );
    const hash = decodeURIComponent(window.location.hash.replace("#", ""));
    let to: ReturnType<typeof setTimeout> | undefined;
    if (hash) {
      to = setTimeout(() => useStore.getState().scrollToId(hash), 900);
    }
    return () => {
      cancelAnimationFrame(id);
      if (to) clearTimeout(to);
    };
  }, []);

  // smooth scroll + progress
  useEffect(() => {
    // debug aid: ?scroll=0.2 pins the camera at a fixed point on the journey
    const pin = new URLSearchParams(window.location.search).get("scroll");
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    if (pin !== null) {
      setScroll(Math.max(0, Math.min(1, parseFloat(pin))));
    } else {
      lenis.on("scroll", ({ scroll, limit }: { scroll: number; limit: number }) => {
        setScroll(limit > 0 ? scroll / limit : 0);
      });
    }

    // expose a Lenis-backed smooth scroll to nav + deep links
    setScrollToId((id: string) => {
      const el = document.getElementById(id);
      if (el) lenis.scrollTo(el, { offset: 0, duration: 1.2 });
    });

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, [setScroll, setScrollToId]);

  // active palette + nav panel via intersection
  useEffect(() => {
    const panels = Array.from(document.querySelectorAll<HTMLElement>(".panel"));
    const io = new IntersectionObserver(
      (entries) => {
        // pick the most-visible intersecting panel
        let best: IntersectionObserverEntry | null = null;
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          if (!best || e.intersectionRatio > best.intersectionRatio) best = e;
        }
        if (best) {
          const el = best.target as HTMLElement;
          const active = Number(el.dataset.active ?? 0);
          const panel = Number(el.dataset.index ?? 0);
          setActive(active);
          setPanel(panel);
        }
      },
      { threshold: [0.3, 0.5, 0.7] },
    );
    panels.forEach((p) => io.observe(p));
    return () => io.disconnect();
  }, [setActive, setPanel]);

  return (
    <>
      <div className="bg-canvas">
        <CanvasBoundary>
          <Canvas
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
            camera={{ position: [0, 0, 8], fov: 60, near: 0.1, far: 60 }}
          >
            <Journey />
          </Canvas>
        </CanvasBoundary>
      </div>

      <Chrome />
      <Overlay />
    </>
  );
}

function Chrome() {
  const audioOn = useStore((s) => s.audioOn);
  const setAudioOn = useStore((s) => s.setAudioOn);
  const scroll = useStore((s) => s.scroll);
  const scrollToId = useStore((s) => s.scrollToId);

  return (
    <div className="chrome" aria-hidden="false">
      <div className="progress" style={{ width: `${scroll * 100}%` }} />
      <button
        className="brand"
        onClick={() => scrollToId("hero")}
        aria-label="Back to top"
      >
        SP<b>.</b>
      </button>
      <button
        className={`audio-toggle ${audioOn ? "on" : ""}`}
        onClick={() => setAudioOn(!audioOn)}
        aria-pressed={audioOn}
        aria-label="Toggle ambient audio"
      >
        <span className="bars">
          <i />
          <i />
          <i />
          <i />
        </span>
        {audioOn ? "Sound on" : "Sound off"}
      </button>
      <span className="seo-only">{identity.bio}</span>
    </div>
  );
}
