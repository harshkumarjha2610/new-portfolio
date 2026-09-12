/**
 * GlyphStream
 *
 * Ported from https://framer.com/m/Glyphstream-mDUukW.js
 * Framer-SDK dependencies removed (addPropertyControls, ControlType, useIsStaticRenderer)
 * so it works in a plain Next.js / React project.
 */
"use client";

import * as React from "react";

const REVEAL_SPAN_MS = 800;
const REVEAL_TOTAL_MS = 1050;

const isImageUrl = (url?: string) =>
  /\.(png|jpe?g|gif|webp|avif|bmp|svg)(\?|#|$)/i.test(url ?? "");

export interface GlyphStreamProps {
  media?: string;
  cellSize?: number;
  characters?: string;
  colorMode?: "monochrome" | "sampled";
  invert?: boolean;
  contrast?: number;
  darkCutoff?: number;
  minOpacity?: number;
  glyphColor?: string;
  backgroundColor?: string;
  font?: { fontFamily?: string; fontWeight?: number; fontStyle?: string };
  playback?: "inView" | "hover" | "always";
  loop?: boolean;
  frameRate?: number;
  imageAnimation?: "shimmer" | "reveal" | "off";
  animationIntensity?: number;
  animationSpeed?: number;
  style?: React.CSSProperties;
  className?: string;
}

export default function GlyphStream(props: GlyphStreamProps) {
  const {
    media = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    cellSize = 8,
    characters = "@%#*+=-:. ",
    colorMode = "monochrome",
    invert = false,
    contrast = 1,
    darkCutoff = 0.12,
    minOpacity = 0.15,
    glyphColor = "#FFFFFF",
    backgroundColor = "#0A0A0A",
    font,
    playback = "inView",
    loop = true,
    frameRate = 24,
    imageAnimation = "shimmer",
    animationIntensity = 0.25,
    animationSpeed = 10,
    style,
    className,
  } = props;

  const isImageMode = isImageUrl(media);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const offscreenRef = React.useRef<HTMLCanvasElement | null>(null);
  const offscreenCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);
  const renderCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);
  const renderFontSignatureRef = React.useRef("");
  const taintedRef = React.useRef(false);

  const rafRef = React.useRef<number | null>(null);
  const lastFrameTimeRef = React.useRef(0);
  const targetFrameIntervalRef = React.useRef(1000 / 24);
  const shouldPlayVideoRef = React.useRef(false);
  const metadataReadyRef = React.useRef(false);

  const baseLumRef = React.useRef<Float32Array | null>(null);
  const baseRGBARef = React.useRef<Uint8ClampedArray | null>(null);
  const jitterRef = React.useRef<Int8Array | null>(null);
  const revealDelaysRef = React.useRef<Float32Array | null>(null);
  const baseReadyRef = React.useRef(false);
  const revealActiveRef = React.useRef(false);
  const revealStartRef = React.useRef(0);
  const imageRafRef = React.useRef<number | null>(null);

  const drawAsciiFrameRef = React.useRef(() => {});
  const startLoopRef = React.useRef(() => {});
  const stopLoopRef = React.useRef(() => {});
  const updateShimmerJitterRef = React.useRef(() => {});

  const [size, setSize] = React.useState({ width: 640, height: 360 });
  const [grid, setGrid] = React.useState({
    width: 640,
    height: 360,
    columns: Math.max(1, Math.floor(640 / Math.max(1, cellSize))),
    rows: Math.max(1, Math.floor(360 / Math.max(1, cellSize))),
  });
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);
  const [isTouchLikeDevice, setIsTouchLikeDevice] = React.useState(false);
  const [isInView, setIsInView] = React.useState(false);
  const [hoverIntent, setHoverIntent] = React.useState(false);
  const [baseVersion, setBaseVersion] = React.useState(0);
  const [resolvedCanvasColors, setResolvedCanvasColors] = React.useState(() => ({
    glyph: glyphColor,
    background: backgroundColor,
  }));

  const fallbackMonospace = 'ui-monospace, "SF Mono", Menlo, Consolas, monospace';
  const fontFamily = font?.fontFamily || fallbackMonospace;
  const fontWeight = font?.fontWeight ?? 400;
  const fontStyle = font?.fontStyle ?? "normal";
  const safeCharacters = characters.length > 0 ? characters : " ";

  React.useEffect(() => {
    targetFrameIntervalRef.current = 1000 / Math.max(1, Math.min(60, frameRate || 24));
  }, [frameRate]);

  const normalizeColor = React.useCallback((color: string) => color.trim().toLowerCase(), []);

  const resolveCanvasColor = React.useCallback(
    (input: string, fallbackLiteral: string) => {
      const safeInput = (input ?? "").trim();
      if (!safeInput) return fallbackLiteral;
      if (!safeInput.startsWith("var(")) return safeInput;
      const varMatch = safeInput.match(/^var\(\s*(--[^,\s)]+)\s*(?:,\s*([^)]+))?\s*\)$/);
      if (!varMatch) return safeInput;
      const propertyName = varMatch[1];
      const inlineFallback = varMatch[2]?.trim() || fallbackLiteral;
      if (typeof window === "undefined") return inlineFallback;
      const target = rootRef.current ?? document.documentElement;
      const computed = window.getComputedStyle(target).getPropertyValue(propertyName).trim();
      return computed || inlineFallback;
    },
    []
  );

  const resolvedInputGlyphColor = resolvedCanvasColors.glyph;
  const resolvedInputBackgroundColor = resolvedCanvasColors.background;

  const parseColorToRgb = React.useCallback(
    (color: string) => {
      const normalized = normalizeColor(color);
      const shortHexMatch = normalized.match(/^#([\da-f]{3})$/i);
      if (shortHexMatch) {
        const hex = shortHexMatch[1];
        return {
          r: parseInt(`${hex[0]}${hex[0]}`, 16),
          g: parseInt(`${hex[1]}${hex[1]}`, 16),
          b: parseInt(`${hex[2]}${hex[2]}`, 16),
        };
      }
      const longHexMatch = normalized.match(/^#([\da-f]{6})$/i);
      if (longHexMatch) {
        const hex = longHexMatch[1];
        return {
          r: parseInt(hex.slice(0, 2), 16),
          g: parseInt(hex.slice(2, 4), 16),
          b: parseInt(hex.slice(4, 6), 16),
        };
      }
      const rgbMatch = normalized.match(/^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*[\d.]+\s*)?\)$/);
      if (rgbMatch) {
        return {
          r: Math.max(0, Math.min(255, parseFloat(rgbMatch[1]))),
          g: Math.max(0, Math.min(255, parseFloat(rgbMatch[2]))),
          b: Math.max(0, Math.min(255, parseFloat(rgbMatch[3]))),
        };
      }
      return null;
    },
    [normalizeColor]
  );

  const backgroundRelativeLuminance = React.useMemo(() => {
    const rgb = parseColorToRgb(resolvedInputBackgroundColor ?? "");
    if (!rgb) return 0;
    const channelToLinear = (channel: number) => {
      const value = channel / 255;
      return value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
    };
    return 0.2126 * channelToLinear(rgb.r) + 0.7152 * channelToLinear(rgb.g) + 0.0722 * channelToLinear(rgb.b);
  }, [parseColorToRgb, resolvedInputBackgroundColor]);

  const resolvedGlyphColor = React.useMemo(() => {
    const normalizedGlyph = normalizeColor(resolvedInputGlyphColor ?? "");
    const normalizedBackground = normalizeColor(resolvedInputBackgroundColor ?? "");
    if (!normalizedGlyph || normalizedGlyph !== normalizedBackground) return resolvedInputGlyphColor;
    return backgroundRelativeLuminance > 0.5 ? "#0A0A0A" : "#FFFFFF";
  }, [backgroundRelativeLuminance, normalizeColor, resolvedInputBackgroundColor, resolvedInputGlyphColor]);

  React.useEffect(() => {
    const update = () => {
      const nextGlyph = resolveCanvasColor(glyphColor, "#FFFFFF");
      const nextBackground = resolveCanvasColor(backgroundColor, "#0A0A0A");
      React.startTransition(() => {
        setResolvedCanvasColors((current) => {
          if (current.glyph === nextGlyph && current.background === nextBackground) return current;
          return { glyph: nextGlyph, background: nextBackground };
        });
      });
    };
    update();
    if (typeof window === "undefined" || typeof MutationObserver === "undefined") return;
    const observer = new MutationObserver(update);
    if (document.documentElement) observer.observe(document.documentElement, { attributes: true, subtree: false });
    if (document.body) observer.observe(document.body, { attributes: true, subtree: false });
    return () => observer.disconnect();
  }, [backgroundColor, glyphColor, resolveCanvasColor]);

  const computeGrid = React.useCallback(
    (width: number, height: number) => {
      const safeWidth = Number.isFinite(width) && width > 0 ? width : 1;
      const safeHeight = Number.isFinite(height) && height > 0 ? height : 1;
      const baseCell = Number.isFinite(cellSize) && cellSize > 0 ? cellSize : 8;
      const maxCols = 100;
      const maxRows = 240;
      let columns = Math.max(1, Math.floor(safeWidth / baseCell));
      columns = Math.min(columns, maxCols);
      const effectiveCell = safeWidth / columns;
      let rows = Math.max(1, Math.round(safeHeight / effectiveCell));
      rows = Math.min(rows, maxRows);
      return { width: safeWidth, height: safeHeight, columns, rows };
    },
    [cellSize]
  );

  const setupVisibleCanvas = React.useCallback((width: number, height: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    canvas.width = Math.max(1, Math.floor(width));
    canvas.height = Math.max(1, Math.floor(height));
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    ctx.imageSmoothingEnabled = false;
    renderCtxRef.current = ctx;
    renderFontSignatureRef.current = "";
    return ctx;
  }, []);

  const drawAsciiFrame = React.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const renderCtx = renderCtxRef.current ?? setupVisibleCanvas(size.width, size.height);
    if (!renderCtx) return;
    const cols = grid.columns;
    const rows = grid.rows;
    const paintBackgroundOnly = () => {
      renderCtx.fillStyle = resolvedInputBackgroundColor;
      renderCtx.fillRect(0, 0, grid.width, grid.height);
    };
    if (taintedRef.current) { paintBackgroundOnly(); return; }
    let liveData: Uint8ClampedArray | null = null;
    if (!isImageMode) {
      const videoEl = videoRef.current;
      if (!videoEl || videoEl.readyState < 2 || videoEl.videoWidth <= 0 || videoEl.videoHeight <= 0) { paintBackgroundOnly(); return; }
      if (!offscreenRef.current) {
        if (typeof document === "undefined") return;
        offscreenRef.current = document.createElement("canvas");
      }
      const offscreen = offscreenRef.current;
      if (offscreen.width !== cols) offscreen.width = cols;
      if (offscreen.height !== rows) offscreen.height = rows;
      if (!offscreenCtxRef.current) offscreenCtxRef.current = offscreen.getContext("2d", { willReadFrequently: true });
      const offCtx = offscreenCtxRef.current;
      if (!offCtx) return;
      offCtx.imageSmoothingEnabled = true;
      offCtx.drawImage(videoEl, 0, 0, cols, rows);
      try { liveData = offCtx.getImageData(0, 0, cols, rows).data; }
      catch { taintedRef.current = true; paintBackgroundOnly(); return; }
    } else if (!baseReadyRef.current || !baseLumRef.current) { paintBackgroundOnly(); return; }

    renderCtx.fillStyle = resolvedInputBackgroundColor;
    renderCtx.fillRect(0, 0, grid.width, grid.height);
    const fontSizePx = Math.max(4, Math.floor(Math.min(size.width / cols, size.height / rows)));
    const fontSignature = `${fontStyle} ${fontWeight} ${fontSizePx}px ${fontFamily}`;
    if (renderFontSignatureRef.current !== fontSignature) {
      renderCtx.textBaseline = "top";
      renderCtx.textAlign = "left";
      renderCtx.font = fontSignature;
      renderFontSignatureRef.current = fontSignature;
    }
    const charCount = safeCharacters.length;
    const cellW = grid.width / cols;
    const cellH = grid.height / rows;
    const isLightBg = backgroundRelativeLuminance > 0.5;
    const themeInvert = isLightBg ? !invert : invert;
    const baseLum = baseLumRef.current;
    const baseRGBA = baseRGBARef.current;
    const jitter = jitterRef.current;
    const reveal = revealDelaysRef.current;
    const isShimmer = isImageMode && imageAnimation === "shimmer" && !!jitter;
    const revealing = isImageMode && imageAnimation === "reveal" && revealActiveRef.current && !!reveal;
    const now = typeof performance !== "undefined" ? performance.now() : Date.now();
    const revealElapsed = revealing ? now - revealStartRef.current : Infinity;

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const ci = y * cols + x;
        let r = 0, g = 0, b = 0, a = 1, lum: number;
        if (!isImageMode && liveData) {
          const i = ci * 4;
          r = liveData[i]; g = liveData[i + 1]; b = liveData[i + 2]; a = liveData[i + 3] / 255;
          if (a <= 0) continue;
          lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        } else {
          if (revealing && reveal && revealElapsed < reveal[ci]) continue;
          lum = baseLum ? baseLum[ci] : 0;
          if (colorMode === "sampled" && baseRGBA) {
            const o = ci * 4; r = baseRGBA[o]; g = baseRGBA[o + 1]; b = baseRGBA[o + 2]; a = baseRGBA[o + 3] / 255;
            if (a <= 0) continue;
          }
        }
        let adjustedLuminance = (lum - 0.5) * contrast + 0.5;
        if (themeInvert) adjustedLuminance = 1 - adjustedLuminance;
        adjustedLuminance = Math.max(0, Math.min(1, adjustedLuminance));
        if (colorMode !== "sampled" && adjustedLuminance < darkCutoff) continue;
        let idx = Math.floor(adjustedLuminance * (charCount - 1));
        if (isShimmer && jitter) idx += jitter[ci];
        idx = Math.max(0, Math.min(charCount - 1, idx));
        const glyph = safeCharacters[idx];
        if (colorMode === "sampled") {
          let sampledR = r, sampledG = g, sampledB = b;
          if (isLightBg && lum > 0.7) { const scale = 0.7 / lum; sampledR = r * scale; sampledG = g * scale; sampledB = b * scale; }
          renderCtx.globalAlpha = 1;
          renderCtx.fillStyle = `rgba(${sampledR}, ${sampledG}, ${sampledB}, ${a})`;
        } else {
          renderCtx.globalAlpha = a * (minOpacity + (1 - minOpacity) * adjustedLuminance);
          renderCtx.fillStyle = resolvedGlyphColor;
        }
        renderCtx.fillText(glyph, x * cellW, y * cellH);
      }
    }
    renderCtx.globalAlpha = 1;
  }, [backgroundRelativeLuminance, colorMode, contrast, darkCutoff, fontFamily, fontStyle, fontWeight, grid, imageAnimation, invert, isImageMode, minOpacity, resolvedGlyphColor, resolvedInputBackgroundColor, safeCharacters, setupVisibleCanvas, size]);

  const updateShimmerJitter = React.useCallback(() => {
    const lum = baseLumRef.current;
    const jitter = jitterRef.current;
    if (!lum || !jitter) return;
    const charCount = safeCharacters.length;
    const isLightBg = backgroundRelativeLuminance > 0.5;
    const themeInvert = isLightBg ? !invert : invert;
    for (let ci = 0; ci < lum.length; ci++) {
      let adjustedLuminance = (lum[ci] - 0.5) * contrast + 0.5;
      if (themeInvert) adjustedLuminance = 1 - adjustedLuminance;
      adjustedLuminance = Math.max(0, Math.min(1, adjustedLuminance));
      const ramp = adjustedLuminance * (charCount - 1);
      const frac = ramp - Math.floor(ramp);
      const nearBoundary = frac < 0.2 || frac > 0.8;
      if (nearBoundary && Math.random() < animationIntensity) { jitter[ci] = Math.random() < 0.5 ? -1 : 1; }
      else { jitter[ci] = 0; }
    }
  }, [animationIntensity, backgroundRelativeLuminance, contrast, invert, safeCharacters]);

  const stopLoop = React.useCallback(() => {
    if (rafRef.current !== null) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
    lastFrameTimeRef.current = 0;
  }, []);

  const startLoop = React.useCallback(() => {
    if (prefersReducedMotion || rafRef.current !== null || !metadataReadyRef.current) return;
    const tick = (timestamp: number) => {
      const videoEl = videoRef.current;
      if (!videoEl || !canvasRef.current || !shouldPlayVideoRef.current || (videoEl.ended && !videoEl.loop)) { stopLoopRef.current(); return; }
      if (lastFrameTimeRef.current === 0) lastFrameTimeRef.current = timestamp;
      if (timestamp - lastFrameTimeRef.current >= targetFrameIntervalRef.current) {
        lastFrameTimeRef.current = timestamp;
        drawAsciiFrameRef.current();
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    lastFrameTimeRef.current = 0;
    rafRef.current = requestAnimationFrame(tick);
  }, [prefersReducedMotion]);

  React.useEffect(() => {
    drawAsciiFrameRef.current = drawAsciiFrame;
    startLoopRef.current = startLoop;
    stopLoopRef.current = stopLoop;
    updateShimmerJitterRef.current = updateShimmerJitter;
  });

  // Responsive sizing
  React.useEffect(() => {
    if (typeof window === "undefined" || typeof ResizeObserver === "undefined") return;
    const node = rootRef.current;
    if (!node) return;
    const updateSize = () => {
      const rect = node.getBoundingClientRect();
      const nextWidth = Math.max(1, Math.floor(rect.width || 640));
      const nextHeight = Math.max(1, Math.floor(rect.height || 360));
      const nextGrid = computeGrid(nextWidth, nextHeight);
      setupVisibleCanvas(nextWidth, nextHeight);
      React.startTransition(() => { setSize({ width: nextWidth, height: nextHeight }); setGrid(nextGrid); });
    };
    updateSize();
    const ro = new ResizeObserver(updateSize);
    ro.observe(node);
    return () => ro.disconnect();
  }, [computeGrid, setupVisibleCanvas]);

  React.useEffect(() => {
    const nextGrid = computeGrid(size.width, size.height);
    React.startTransition(() => { setGrid(nextGrid); });
  }, [cellSize, computeGrid, size.height, size.width]);

  // prefers-reduced-motion
  React.useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = (matches: boolean) => React.startTransition(() => setPrefersReducedMotion(matches));
    update(mq.matches);
    const onChange = (e: MediaQueryListEvent) => update(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Touch detection
  React.useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
    const hoverQ = window.matchMedia("(hover: none)");
    const coarseQ = window.matchMedia("(pointer: coarse)");
    const update = () => React.startTransition(() => setIsTouchLikeDevice(hoverQ.matches || coarseQ.matches));
    update();
    hoverQ.addEventListener("change", update);
    coarseQ.addEventListener("change", update);
    return () => { hoverQ.removeEventListener("change", update); coarseQ.removeEventListener("change", update); };
  }, []);

  // In-view detection
  React.useEffect(() => {
    if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") return;
    const node = rootRef.current;
    if (!node) return;
    const io = new IntersectionObserver((entries) => {
      React.startTransition(() => setIsInView(Boolean(entries[0]?.isIntersecting)));
    });
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const isHoverWithTouchFallback = playback === "hover" && isTouchLikeDevice;
  const shouldPlayVideo =
    !isImageMode &&
    !prefersReducedMotion &&
    (playback === "always" ? true : playback === "hover" ? (isHoverWithTouchFallback ? isInView : hoverIntent) : isInView);

  // Image: sample source once
  React.useEffect(() => {
    if (!isImageMode) { baseReadyRef.current = false; return; }
    if (typeof document === "undefined" || typeof Image === "undefined") return;
    const cols = grid.columns;
    const rows = grid.rows;
    if (cols < 1 || rows < 1 || !media) return;
    let cancelled = false;
    baseReadyRef.current = false;
    taintedRef.current = false;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      if (cancelled) return;
      const naturalW = img.naturalWidth, naturalH = img.naturalHeight;
      if (naturalW <= 0 || naturalH <= 0) return;
      const off = offscreenRef.current ?? (offscreenRef.current = document.createElement("canvas"));
      off.width = cols; off.height = rows;
      const offCtx = off.getContext("2d", { willReadFrequently: true });
      if (!offCtx) return;
      offscreenCtxRef.current = offCtx;
      offCtx.imageSmoothingEnabled = true;
      offCtx.clearRect(0, 0, cols, rows);
      const scale = Math.max(cols / naturalW, rows / naturalH);
      const drawW = naturalW * scale, drawH = naturalH * scale;
      offCtx.drawImage(img, (cols - drawW) / 2, (rows - drawH) / 2, drawW, drawH);
      let data: Uint8ClampedArray;
      try { data = offCtx.getImageData(0, 0, cols, rows).data; }
      catch { taintedRef.current = true; baseReadyRef.current = false; return; }
      const n = cols * rows;
      const lum = new Float32Array(n);
      const rgba = new Uint8ClampedArray(n * 4);
      for (let i = 0; i < n; i++) {
        const o = i * 4;
        lum[i] = (0.299 * data[o] + 0.587 * data[o + 1] + 0.114 * data[o + 2]) / 255;
        rgba[o] = data[o]; rgba[o + 1] = data[o + 1]; rgba[o + 2] = data[o + 2]; rgba[o + 3] = data[o + 3];
      }
      const delays = new Float32Array(n);
      for (let i = 0; i < n; i++) delays[i] = Math.random() * REVEAL_SPAN_MS;
      baseLumRef.current = lum; baseRGBARef.current = rgba; jitterRef.current = new Int8Array(n);
      revealDelaysRef.current = delays; baseReadyRef.current = true;
      setBaseVersion((v) => v + 1);
    };
    img.onerror = () => { baseReadyRef.current = false; };
    img.src = media;
    return () => { cancelled = true; };
  }, [grid.columns, grid.rows, isImageMode, media]);

  // Image animation driver
  React.useEffect(() => {
    if (!isImageMode) return;
    const cancel = () => { if (imageRafRef.current !== null) { cancelAnimationFrame(imageRafRef.current); imageRafRef.current = null; } };
    if (prefersReducedMotion || imageAnimation === "off") {
      revealActiveRef.current = false;
      if (jitterRef.current) jitterRef.current.fill(0);
      drawAsciiFrameRef.current();
      return cancel;
    }
    if (typeof window === "undefined") return cancel;
    if (imageAnimation === "reveal") {
      revealActiveRef.current = true;
      revealStartRef.current = typeof performance !== "undefined" ? performance.now() : Date.now();
      if (jitterRef.current) jitterRef.current.fill(0);
      const loop = () => {
        drawAsciiFrameRef.current();
        const now = typeof performance !== "undefined" ? performance.now() : Date.now();
        if (now - revealStartRef.current >= REVEAL_TOTAL_MS) { revealActiveRef.current = false; drawAsciiFrameRef.current(); imageRafRef.current = null; return; }
        imageRafRef.current = requestAnimationFrame(loop);
      };
      imageRafRef.current = requestAnimationFrame(loop);
      return cancel;
    }
    revealActiveRef.current = false;
    const interval = 1000 / Math.max(1, animationSpeed);
    let last = 0;
    const loop = (timestamp: number) => {
      if (!last) last = timestamp;
      if (timestamp - last >= interval) { last = timestamp; updateShimmerJitterRef.current(); drawAsciiFrameRef.current(); }
      imageRafRef.current = requestAnimationFrame(loop);
    };
    imageRafRef.current = requestAnimationFrame(loop);
    return cancel;
  }, [animationSpeed, baseVersion, imageAnimation, isImageMode, prefersReducedMotion]);

  // Video wiring
  React.useEffect(() => {
    if (isImageMode) return;
    const videoEl = videoRef.current;
    if (!videoEl) return;
    taintedRef.current = false;
    metadataReadyRef.current = false;
    videoEl.loop = loop;
    videoEl.muted = true;
    const tryPlay = async () => { try { await videoEl.play(); } catch { /* autoplay blocked */ } };
    const onLoadedMetadata = () => {
      metadataReadyRef.current = true;
      drawAsciiFrameRef.current();
      if (prefersReducedMotion) { videoEl.pause(); return; }
      if (shouldPlayVideoRef.current) { void tryPlay(); startLoopRef.current(); } else { videoEl.pause(); }
    };
    const onLoadedData = () => drawAsciiFrameRef.current();
    const onPlay = () => { if (prefersReducedMotion || !shouldPlayVideoRef.current) { videoEl.pause(); return; } startLoopRef.current(); };
    const onPause = () => stopLoopRef.current();
    const onEnded = () => { if (videoEl.loop && shouldPlayVideoRef.current) { startLoopRef.current(); } else { stopLoopRef.current(); } };
    videoEl.addEventListener("loadedmetadata", onLoadedMetadata);
    videoEl.addEventListener("loadeddata", onLoadedData);
    videoEl.addEventListener("play", onPlay);
    videoEl.addEventListener("pause", onPause);
    videoEl.addEventListener("ended", onEnded);
    drawAsciiFrameRef.current();
    if (!prefersReducedMotion && shouldPlayVideoRef.current) { void tryPlay(); startLoopRef.current(); }
    if (prefersReducedMotion) videoEl.pause();
    return () => {
      videoEl.removeEventListener("loadedmetadata", onLoadedMetadata);
      videoEl.removeEventListener("loadeddata", onLoadedData);
      videoEl.removeEventListener("play", onPlay);
      videoEl.removeEventListener("pause", onPause);
      videoEl.removeEventListener("ended", onEnded);
    };
  }, [isImageMode, loop, media, prefersReducedMotion]);

  // Video play/pause gate
  React.useEffect(() => {
    if (isImageMode) return;
    shouldPlayVideoRef.current = shouldPlayVideo;
    const videoEl = videoRef.current;
    if (!videoEl) return;
    if (!shouldPlayVideo || !metadataReadyRef.current) { videoEl.pause(); stopLoopRef.current(); drawAsciiFrameRef.current(); return; }
    void videoEl.play().catch(() => {});
    startLoopRef.current();
  }, [isImageMode, shouldPlayVideo]);

  // Repaint on settings change
  React.useEffect(() => {
    const videoLoopRunning = !isImageMode && shouldPlayVideoRef.current && metadataReadyRef.current;
    if (!videoLoopRunning) drawAsciiFrameRef.current();
  }, [backgroundRelativeLuminance, baseVersion, colorMode, contrast, darkCutoff, fontFamily, fontStyle, fontWeight, invert, isImageMode, minOpacity, resolvedGlyphColor, resolvedInputBackgroundColor, safeCharacters, size]);

  // Cleanup
  React.useEffect(() => {
    return () => {
      stopLoop();
      if (imageRafRef.current !== null) { cancelAnimationFrame(imageRafRef.current); imageRafRef.current = null; }
      const videoEl = videoRef.current;
      if (videoEl) videoEl.pause();
    };
  }, [stopLoop]);

  return (
    <div
      ref={rootRef}
      className={className}
      onPointerEnter={() => { if (playback !== "hover" || isHoverWithTouchFallback) return; setHoverIntent(true); }}
      onPointerLeave={() => { if (playback !== "hover" || isHoverWithTouchFallback) return; setHoverIntent(false); }}
      style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", ...style }}
    >
      {!isImageMode && (
        <video
          ref={videoRef}
          src={media}
          crossOrigin="anonymous"
          playsInline
          muted
          loop={loop}
          preload="auto"
          aria-hidden="true"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0, pointerEvents: "none" }}
        />
      )}
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
        role="img"
        aria-label="ASCII art rendering"
      />
    </div>
  );
}
