/**
 * Feed & Grow Jinwoo - Web Audio API Procedural Sound Engine
 * Zero external audio dependencies: 100% reliable, instant, lightweight, and hilarious!
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.masterGain = null;
    this.initAudioContext();
  }

  initAudioContext() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    } catch (e) {
      console.warn("Web Audio API not supported", e);
    }
  }

  resume() {
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  setEnabled(val) {
    this.enabled = !!val;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.enabled ? 0.35 : 0, this.ctx.currentTime);
    }
  }

  // 1. 냠냠 / 씹는 소리 (Cute bite / chew)
  playBite() {
    if (!this.enabled || !this.ctx) return;
    this.resume();

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    const baseFreq = 420 + Math.random() * 120;
    osc.frequency.setValueAtTime(baseFreq, t);
    osc.frequency.exponentialRampToValueAtTime(140, t + 0.08);

    gain.gain.setValueAtTime(0.4, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.09);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.1);
  }

  // 2. 꿀꺽 삼키는 소리 (Gulp)
  playGulp() {
    if (!this.enabled || !this.ctx) return;
    this.resume();

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(180, t);
    osc.frequency.exponentialRampToValueAtTime(320, t + 0.07);
    osc.frequency.exponentialRampToValueAtTime(90, t + 0.18);

    gain.gain.setValueAtTime(0.45, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.2);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.2);
  }

  // 3. 찰진 트림 소리 (Hilarious Burp)
  playBurp() {
    if (!this.enabled || !this.ctx) return;
    this.resume();

    const t = this.ctx.currentTime;
    // Low frequency saw wave with LFO modulation
    const osc = this.ctx.createOscillator();
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    const gain = this.ctx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(85, t);
    osc.frequency.exponentialRampToValueAtTime(60, t + 0.35);

    // LFO for fluttering throat vibration
    lfo.type = "sawtooth";
    lfo.frequency.setValueAtTime(28, t);
    lfo.frequency.linearRampToValueAtTime(15, t + 0.35);

    lfoGain.gain.setValueAtTime(35, t);

    gain.gain.setValueAtTime(0.55, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.4);

    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);

    osc.connect(gain);
    gain.connect(this.masterGain);

    lfo.start(t);
    osc.start(t);

    lfo.stop(t + 0.42);
    osc.stop(t + 0.42);
  }

  // 4. 레벨업 & 진화 팡파레 (Celebration Fanfare Chord)
  playEvolution() {
    if (!this.enabled || !this.ctx) return;
    this.resume();

    const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50]; // C Major arpeggio
    notes.forEach((freq, idx) => {
      const t = this.ctx.currentTime + idx * 0.08;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = idx === notes.length - 1 ? "sawtooth" : "triangle";
      osc.frequency.setValueAtTime(freq, t);

      const dur = idx === notes.length - 1 ? 0.6 : 0.22;
      gain.gain.setValueAtTime(0.35, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + dur);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t);
      osc.stop(t + dur + 0.05);
    });
  }

  // 5. 코인 획득 사운드 (Coin Ting)
  playCoin() {
    if (!this.enabled || !this.ctx) return;
    this.resume();

    const t = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = "sine";
    osc2.type = "sine";

    osc1.frequency.setValueAtTime(987.77, t); // B5
    osc1.frequency.setValueAtTime(1318.51, t + 0.08); // E6

    osc2.frequency.setValueAtTime(987.77 * 1.5, t);
    osc2.frequency.setValueAtTime(1318.51 * 1.5, t + 0.08);

    gain.gain.setValueAtTime(0.25, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.35);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.masterGain);

    osc1.start(t);
    osc2.start(t);
    osc1.stop(t + 0.38);
    osc2.stop(t + 0.38);
  }

  // 6. 업그레이드 성공 (Positive Powerup)
  playUpgrade() {
    if (!this.enabled || !this.ctx) return;
    this.resume();

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(330, t);
    osc.frequency.exponentialRampToValueAtTime(660, t + 0.12);
    osc.frequency.exponentialRampToValueAtTime(880, t + 0.22);

    gain.gain.setValueAtTime(0.35, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.28);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.3);
  }

  // 7. 배 찌르기 통통 튀는 젤리음 (Belly Boing)
  playBoing() {
    if (!this.enabled || !this.ctx) return;
    this.resume();

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    const startFreq = 220 + Math.random() * 80;
    osc.frequency.setValueAtTime(startFreq, t);
    osc.frequency.exponentialRampToValueAtTime(startFreq * 2.2, t + 0.09);
    osc.frequency.exponentialRampToValueAtTime(startFreq * 0.8, t + 0.2);

    gain.gain.setValueAtTime(0.35, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.22);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.25);
  }

  // 8. 콤보 팡팡 소리
  playCombo(comboCount) {
    if (!this.enabled || !this.ctx) return;
    this.resume();

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    const pitch = Math.min(1200, 350 + comboCount * 25);
    osc.frequency.setValueAtTime(pitch, t);
    osc.frequency.exponentialRampToValueAtTime(pitch + 150, t + 0.07);

    gain.gain.setValueAtTime(0.25, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.12);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.14);
  }

  // 9. 산뜻한 일반 레벨업 차임
  playLevelUp() {
    if (!this.enabled || !this.ctx) return;
    this.resume();

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(523.25, t);
    osc.frequency.setValueAtTime(659.25, t + 0.06);
    osc.frequency.setValueAtTime(783.99, t + 0.12);

    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.22);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.24);
  }
}

// Global Sound Instance
const soundEngine = new SoundEngine();
window.soundEngine = soundEngine;

// Mobile AudioContext Universal Unlock on First User Touch
const unlockAudioOnTouch = () => {
  if (soundEngine && soundEngine.ctx) {
    if (soundEngine.ctx.state === "suspended") {
      soundEngine.ctx.resume();
    }
  }
};
["touchstart", "touchend", "pointerdown", "click"].forEach(evt => {
  window.addEventListener(evt, unlockAudioOnTouch, { once: true, passive: true });
});
