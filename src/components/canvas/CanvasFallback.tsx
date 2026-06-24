import { Component, type ReactNode } from "react";

/**
 * If WebGL is unavailable (old devices, blocked contexts, headless), we must
 * never show a blank page — the content overlay is fully usable on its own.
 * This boundary swaps the 3D canvas for an animated CSS gradient backdrop.
 */
export class CanvasBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(err: unknown) {
    // eslint-disable-next-line no-console
    console.warn("WebGL unavailable, falling back to CSS background.", err);
  }

  render() {
    if (this.state.failed) return <div className="bg-fallback" aria-hidden="true" />;
    return this.props.children;
  }
}
