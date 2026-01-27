"use client";

import * as React from "react";

type ArcDatum = {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  altitude?: number;
  color?: string | string[];
};

type PointDatum = {
  lat: number;
  lng: number;
  size?: number;
  color?: string;
};

const DEFAULT_ARCS: ArcDatum[] = [
  { startLat: -26.2041, startLng: 28.0473, endLat: 51.5072, endLng: -0.1276, altitude: 0.32 },
  { startLat: -26.2041, startLng: 28.0473, endLat: 25.2048, endLng: 55.2708, altitude: 0.35 },
  { startLat: -26.2041, startLng: 28.0473, endLat: 40.7128, endLng: -74.006, altitude: 0.38 },
  { startLat: -26.2041, startLng: 28.0473, endLat: -1.2921, endLng: 36.8219, altitude: 0.25 },
  { startLat: -26.2041, startLng: 28.0473, endLat: 6.5244, endLng: 3.3792, altitude: 0.28 },
];

const DEFAULT_POINTS: PointDatum[] = [
  { lat: -26.2041, lng: 28.0473, size: 0.22, color: "rgba(255,255,255,0.85)" },
  { lat: -33.9249, lng: 18.4241, size: 0.18, color: "rgba(255,255,255,0.75)" },
  { lat: 51.5072, lng: -0.1276, size: 0.14, color: "rgba(255,255,255,0.75)" },
  { lat: 25.2048, lng: 55.2708, size: 0.14, color: "rgba(255,255,255,0.75)" },
  { lat: 40.7128, lng: -74.006, size: 0.14, color: "rgba(255,255,255,0.75)" },
];

// Optional: cache geojson so you don’t refetch/reparse on rerenders/routes
let WORLD_GEOJSON: any | null = null;
let WORLD_GEOJSON_PROMISE: Promise<any> | null = null;
function getWorldGeoJSON(signal: AbortSignal) {
  if (WORLD_GEOJSON) return Promise.resolve(WORLD_GEOJSON);
  if (WORLD_GEOJSON_PROMISE) return WORLD_GEOJSON_PROMISE;
  WORLD_GEOJSON_PROMISE = fetch(
    "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson",
    { signal }
  )
    .then((r) => r.json())
    .then((j) => {
      WORLD_GEOJSON = j;
      return j;
    });
  return WORLD_GEOJSON_PROMISE;
}

export function GitHubGlobe({
  className,
  arcs = DEFAULT_ARCS,
  points = DEFAULT_POINTS,
}: {
  className?: string;
  arcs?: ArcDatum[];
  points?: PointDatum[];
}) {
  const hostRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    let globe: any = null;
    let io: IntersectionObserver | null = null;

    const controller = new AbortController();
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Track whether the globe is allowed to animate right now
    let inView = true;
    let pausedForScroll = false;
    let scrollTimer: any = null;

    const init = async () => {
      if (!hostRef.current) return;

      const [{ default: Globe }, THREE] = await Promise.all([
        import("globe.gl"),
        import("three"),
      ]);

      if (!hostRef.current) return;

      globe = new Globe(hostRef.current, { animateIn: true });

      // Transparent canvas so hero gradient shows through
      globe.backgroundColor("rgba(0,0,0,0)");
      globe.renderer().setClearColor(0x000000, 0);

      // ✅ Biggest perf win: cap DPR hard (retina DPR=2/3 kills scroll)
      globe.renderer().setPixelRatio(1);

      // Keep your ocean imagery as-is
      globe.globeImageUrl("https://unpkg.com/three-globe/example/img/earth-day.jpg");
      globe.bumpImageUrl("https://unpkg.com/three-globe/example/img/earth-topology.png");

      // Atmosphere
      globe.showAtmosphere(true);
      globe.atmosphereColor("rgba(56, 189, 248, 0.85)");
      globe.atmosphereAltitude(0.18);

      // Less overhead
      globe.enablePointerInteraction(false);

      // Lighting
      const ambient = new THREE.AmbientLight(0xffffff, 0.6);
      const key = new THREE.DirectionalLight(0xffffff, 1.05);
      key.position.set(-2.4, 1.1, 1.1);
      const rim = new THREE.DirectionalLight(0xff2d55, 0.35);
      rim.position.set(2.6, -1.1, -1.2);
      globe.lights([ambient, key, rim]);

      // Material tweaks (keep your existing look)
      const mat = globe.globeMaterial?.();
      if (mat) {
        mat.shininess = 0.7;
        mat.emissive = new THREE.Color("#000000");
        mat.emissiveIntensity = 0.0;
        mat.color = new THREE.Color("#aed9ff");
        mat.color.convertSRGBToLinear?.();
      }

      // Polygons (unchanged visuals)
      const geo = await getWorldGeoJSON(controller.signal);
      const features = geo?.features ?? [];
      globe
        .polygonsData(features)
        .polygonAltitude(0.01)
        .polygonCapColor(() => "rgba(245, 158, 11, 0.75)")
        .polygonSideColor(() => "rgba(56, 189, 248, 0.85)")
        .polygonStrokeColor(() => "rgba(255,255,255,0.10)")
        .polygonsTransitionDuration(0);

      // Arcs
      globe
        .arcsData(arcs)
        .arcColor((d: ArcDatum) => d.color ?? ["rgba(56, 189, 248, 0.85)", "rgba(255,255,255,0.15)"])
        .arcAltitude((d: ArcDatum) => d.altitude ?? 0.35)
        .arcStroke(0.65)
        .arcDashLength(0.36)
        .arcDashGap(1.55)
        .arcDashInitialGap(() => Math.random() * 2)
        .arcDashAnimateTime(prefersReducedMotion ? 0 : 2600);

      // Points
      globe
        .pointsData(points)
        .pointColor((p: PointDatum) => p.color ?? "rgba(255,255,255,0.75)")
        .pointAltitude((p: PointDatum) => (p.size ?? 0.14) * 0.14)
        .pointRadius((p: PointDatum) => (p.size ?? 0.14) * 0.16)
        .pointsMerge(true);

      // Camera + controls
      globe.pointOfView({ lat: -10, lng: 20, altitude: 2.25 }, 0);
      const controls = globe.controls();

      controls.enablePan = false;

      // ✅ Damping makes the loop “always updating”.
      controls.enableDamping = false;
      controls.dampingFactor = 0;

      // If you don’t need zoom, disable it (less input work)
      // controls.enableZoom = false;

      controls.minDistance = 220;
      controls.maxDistance = 520;

      controls.autoRotate = !prefersReducedMotion;
      controls.autoRotateSpeed = 0.55;

      // ✅ Fix: width/height should be numbers (not arrays)
      const resize = () => {
        if (!hostRef.current || !globe) return;
        const { clientWidth, clientHeight } = hostRef.current;
        globe.width(clientWidth);
        globe.height(clientHeight);
      };
      resize();
      window.addEventListener("resize", resize);

      // Pause when offscreen
      io = new IntersectionObserver(
        ([entry]) => {
          inView = !!entry?.isIntersecting;
          if (!globe || document.hidden) return;
          inView ? globe.resumeAnimation() : globe.pauseAnimation();
        },
        { threshold: 0.08 }
      );
      io.observe(hostRef.current);

      // Pause when tab hidden
      const onVis = () => {
        if (!globe) return;
        if (document.hidden) globe.pauseAnimation();
        else if (inView && !pausedForScroll) globe.resumeAnimation();
      };
      document.addEventListener("visibilitychange", onVis);

      // ✅ Huge UX win: pause animation while scrolling, resume after 120ms idle
      const onScroll = () => {
        if (!globe || document.hidden || !inView) return;

        if (!pausedForScroll) {
          pausedForScroll = true;
          try { globe.pauseAnimation(); } catch {}
        }

        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
          pausedForScroll = false;
          if (!document.hidden && inView) {
            try { globe.resumeAnimation(); } catch {}
          }
        }, 120);
      };

      window.addEventListener("scroll", onScroll, { passive: true });

      // Cleanup
      return () => {
        window.removeEventListener("resize", resize);
        window.removeEventListener("scroll", onScroll);
        document.removeEventListener("visibilitychange", onVis);
      };
    };

    let innerCleanup: null | (() => void) = null;

    init()
      .then((c) => {
        innerCleanup = typeof c === "function" ? c : null;
      })
      .catch(() => {});

    return () => {
      controller.abort();
      innerCleanup?.();
      io?.disconnect();

      // ✅ Dispose GPU resources to avoid memory accumulating on navigations
      try {
        globe?.pauseAnimation?.();
      } catch {}

      try {
        const renderer = globe?.renderer?.();
        renderer?.renderLists?.dispose?.();
        renderer?.dispose?.();
        renderer?.forceContextLoss?.();
      } catch {}

      globe = null;
      if (hostRef.current) hostRef.current.innerHTML = "";
    };
  }, [arcs, points]);

  return <div ref={hostRef} className={className} />;
}
