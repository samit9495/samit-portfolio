import { useEffect, useRef } from "react";
import { useStore } from "../store/useStore";

/**
 * Generative ambient pad built entirely in the Web Audio API — a few detuned
 * oscillators through a slow filter sweep. Royalty-free, ships with zero asset
 * files, and gives the analyser a real signal to drive the shader uniforms.
 */
export function useAudio() {
  const audioOn = useStore((s) => s.audioOn);
  const setAudioLevel = useStore((s) => s.setAudioLevel);

  const ctxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const dataRef = useRef<Uint8Array | null>(null);
  const rafRef = useRef<number>(0);
  const lfoTimers = useRef<number[]>([]);

  useEffect(() => {
    if (!audioOn) {
      // fade out + suspend
      const ctx = ctxRef.current;
      const master = masterRef.current;
      if (ctx && master) {
        master.gain.cancelScheduledValues(ctx.currentTime);
        master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
        master.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.8);
      }
      return;
    }

    const AC = window.AudioContext || (window as any).webkitAudioContext;
    const ctx: AudioContext = ctxRef.current ?? new AC();
    ctxRef.current = ctx;
    if (ctx.state === "suspended") ctx.resume();

    const master = ctx.createGain();
    master.gain.value = 0.0001;
    masterRef.current = master;

    const analyser = ctx.createAnalyser();
    analyser.fftSize = 256;
    analyser.smoothingTimeConstant = 0.85;
    analyserRef.current = analyser;
    dataRef.current = new Uint8Array(analyser.frequencyBinCount);

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 700;
    filter.Q.value = 6;

    // gentle filter sweep
    const sweep = ctx.createOscillator();
    const sweepGain = ctx.createGain();
    sweep.frequency.value = 0.06;
    sweepGain.gain.value = 360;
    sweep.connect(sweepGain).connect(filter.frequency);
    sweep.start();

    // ambient chord (A minor 9-ish, low + airy)
    const freqs = [110, 164.81, 220, 277.18, 329.63];
    const oscNodes: OscillatorNode[] = [];
    freqs.forEach((f, i) => {
      const osc = ctx.createOscillator();
      osc.type = i % 2 === 0 ? "sine" : "triangle";
      osc.frequency.value = f;
      osc.detune.value = (Math.random() - 0.5) * 8;
      const g = ctx.createGain();
      g.gain.value = 0.12 / (i + 1);
      // slow tremolo per voice
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.value = 0.05 + Math.random() * 0.15;
      lfoGain.gain.value = g.gain.value * 0.6;
      lfo.connect(lfoGain).connect(g.gain);
      lfo.start();
      osc.connect(g).connect(filter);
      osc.start();
      oscNodes.push(osc, lfo);
    });

    filter.connect(master);
    master.connect(analyser);
    analyser.connect(ctx.destination);

    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setValueAtTime(0.0001, ctx.currentTime);
    master.gain.exponentialRampToValueAtTime(0.5, ctx.currentTime + 1.6);

    const tick = () => {
      const a = analyserRef.current;
      const d = dataRef.current;
      if (a && d) {
        a.getByteFrequencyData(d);
        let sum = 0;
        for (let i = 0; i < d.length; i++) sum += d[i] * d[i];
        const rms = Math.sqrt(sum / d.length) / 255;
        setAudioLevel(Math.min(1, rms * 1.8));
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      lfoTimers.current.forEach(clearTimeout);
      try {
        oscNodes.forEach((o) => o.stop());
        sweep.stop();
      } catch {
        /* already stopped */
      }
      setAudioLevel(0);
    };
  }, [audioOn, setAudioLevel]);
}
