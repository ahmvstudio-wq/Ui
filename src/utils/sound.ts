// Sound Controller for Tadbeer Transformation Trading OS
// Integrates exact extracted audio clips with Web Audio API synthesis

class SoundEngine {
  private enabled: boolean = true;
  private volume: number = 0.65;
  private audioCtx: AudioContext | null = null;
  private audioCache: Map<string, HTMLAudioElement[]> = new Map();

  constructor() {
    const saved = localStorage.getItem('tadbeer_sound_enabled') ?? localStorage.getItem('corbel_sound_enabled');
    if (saved !== null) {
      this.enabled = saved === 'true';
    }
    this.initAudioCache();
  }

  private initAudioCache() {
    const sounds = [
      { key: 'tab', url: '/sounds/sfx_tab.wav' },
      { key: 'nav', url: '/sounds/sfx_nav.wav' },
      { key: 'toggle', url: '/sounds/sfx_toggle.wav' },
    ];

    sounds.forEach(({ key, url }) => {
      const pool: HTMLAudioElement[] = [];
      for (let i = 0; i < 3; i++) {
        const audio = new Audio(url);
        audio.preload = 'auto';
        pool.push(audio);
      }
      this.audioCache.set(key, pool);
    });
  }

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  private playFromPool(key: string, fallbackSynth?: () => void) {
    if (!this.enabled) return;
    const pool = this.audioCache.get(key);
    if (pool && pool.length > 0) {
      const available = pool.find((a) => a.paused || a.ended) || pool[0];
      try {
        available.currentTime = 0;
        available.volume = this.volume;
        const playPromise = available.play();
        if (playPromise) {
          playPromise.catch(() => {
            // If browser autoplay policies block file, trigger synth
            if (fallbackSynth) fallbackSynth();
          });
        }
        return;
      } catch {
        if (fallbackSynth) fallbackSynth();
      }
    } else if (fallbackSynth) {
      fallbackSynth();
    }
  }

  // Exact Tab Switch Sound (clicks on top nav tabs: Dashboard, Analytics, Kanban)
  public playTab() {
    this.playFromPool('tab', () => this.synthClick(320, 0.04));
  }

  // Exact Dock Nav Sound (clicks on left dock icons)
  public playNav() {
    this.playFromPool('nav', () => this.synthClick(260, 0.05));
  }

  // Exact Theme Toggle Sound (tactile mechanical click)
  public playToggle() {
    this.playFromPool('toggle', () => this.synthToggle());
  }

  // Micro pop for filter pills (Overview, Online, In Store, 7D, 30D, Assignees)
  public playFilter() {
    if (!this.enabled) return;
    this.synthClick(440, 0.035, 'triangle');
  }

  // Soft hover tick
  public playHover() {
    if (!this.enabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.015);
    gain.gain.setValueAtTime(this.volume * 0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.015);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.015);
  }

  // Pleasant success chime for completing tasks or moving cards to Done
  public playSuccess() {
    if (!this.enabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.07);
      gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.07);
      gain.gain.linearRampToValueAtTime(this.volume * 0.15, ctx.currentTime + idx * 0.07 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.07 + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + idx * 0.07);
      osc.stop(ctx.currentTime + idx * 0.07 + 0.35);
    });
  }

  // Card drop thud
  public playDrop() {
    if (!this.enabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(45, ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(this.volume * 0.18, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  }

  private synthClick(freq: number, duration: number, type: OscillatorType = 'sine') {
    const ctx = this.getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.5, ctx.currentTime + duration);
    gain.gain.setValueAtTime(this.volume * 0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  }

  private synthToggle() {
    const ctx = this.getAudioContext();
    if (!ctx) return;
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();
    osc1.type = 'sine';
    osc2.type = 'triangle';
    osc1.frequency.setValueAtTime(320, ctx.currentTime);
    osc1.frequency.exponentialRampToValueAtTime(540, ctx.currentTime + 0.08);
    osc2.frequency.setValueAtTime(160, ctx.currentTime);
    osc2.frequency.exponentialRampToValueAtTime(280, ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(this.volume * 0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);
    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);
    osc1.start();
    osc2.start();
    osc1.stop(ctx.currentTime + 0.09);
    osc2.stop(ctx.currentTime + 0.09);
  }

  public toggleMute(): boolean {
    this.enabled = !this.enabled;
    localStorage.setItem('tadbeer_sound_enabled', String(this.enabled));
    return this.enabled;
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
  }
}

export const sound = new SoundEngine();
