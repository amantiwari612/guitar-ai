import { useEffect, useRef, useState } from "react";
import { PitchDetector } from "pitchy";
import { motion } from "framer-motion";

const STRINGS = [
  { note: "E", octave: 2, freq: 82.41 },
  { note: "A", octave: 2, freq: 110.0 },
  { note: "D", octave: 3, freq: 146.83 },
  { note: "G", octave: 3, freq: 196.0 },
  { note: "B", octave: 3, freq: 246.94 },
  { note: "E", octave: 4, freq: 328.63 },
];

export default function Tuner() {
  const [freq, setFreq] = useState(0);
  const [activeStringIdx, setActiveStringIdx] = useState<number | null>(null);
  const [manualModeIdx, setManualModeIdx] = useState<number | null>(null);
  const [cents, setCents] = useState(0);
  const [inTune, setInTune] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [tunedStrings, setTunedStrings] = useState<Set<number>>(new Set());

  // Use a ref to sync manual mode so changing it doesn't restart the mic's useEffect
  const manualModeRef = useRef<number | null>(null);
  useEffect(() => {
    manualModeRef.current = manualModeIdx;
  }, [manualModeIdx]);

  useEffect(() => {
    if (activeStringIdx !== null && inTune) {
      setTunedStrings(prev => {
        if (!prev.has(activeStringIdx)) {
          const next = new Set(prev);
          next.add(activeStringIdx);
          return next;
        }
        return prev;
      });
    }
  }, [activeStringIdx, inTune]);

  const smoothFreqRef = useRef<number[]>([]);

  useEffect(() => {
    let audioContext: AudioContext;
    let analyser: AnalyserNode;
    let rafId: number;

    const start = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: false,
            noiseSuppression: false,
            autoGainControl: false,
          },
        });
        setIsListening(true);
        audioContext = new AudioContext();

        const source = audioContext.createMediaStreamSource(stream);

        analyser = audioContext.createAnalyser();
        analyser.fftSize = 4096;
        analyser.smoothingTimeConstant = 0.8;

        const gainNode = audioContext.createGain();
        gainNode.gain.value = 3;

        source.connect(gainNode);
        gainNode.connect(analyser);

        const detector = PitchDetector.forFloat32Array(analyser.fftSize);
        const input = new Float32Array(detector.inputLength);

        const detect = () => {
          analyser.getFloatTimeDomainData(input);
          const [pitch, clarity] = detector.findPitch(input, audioContext.sampleRate);

          if (clarity < 0.65 || pitch < 60 || pitch > 400) {
            rafId = requestAnimationFrame(detect);
            return;
          }

          const history = smoothFreqRef.current;
          history.push(pitch);
          if (history.length > 5) history.shift();

          const avgFreq = history.reduce((a, b) => a + b, 0) / history.length;
          setFreq(avgFreq);

          // Manual string or Auto string detection
          let targetStringIdx = null;
          const currentManualMode = manualModeRef.current;

          if (currentManualMode !== null) {
            targetStringIdx = currentManualMode;
          } else {
            // Auto Mode: Snap to the closest guitar string
            let minDiff = Infinity;
            for (let i = 0; i < STRINGS.length; i++) {
              const centsOff = Math.abs(1200 * Math.log2(avgFreq / STRINGS[i].freq));
              if (centsOff < minDiff) {
                minDiff = centsOff;
                targetStringIdx = i;
              }
            }

            // Only lock onto a string if it's within roughly +/- 2.5 semitones (250 cents)
            // If they are way off the guitar range completely, drop it.
            if (minDiff > 250) {
              targetStringIdx = null;
            }
          }

          if (targetStringIdx !== null) {
            setActiveStringIdx(targetStringIdx);
            const target = STRINGS[targetStringIdx];
            const centsOff = 1200 * Math.log2(avgFreq / target.freq);
            setCents(centsOff);
            setInTune(Math.abs(centsOff) < 5);
          } else {
            setActiveStringIdx(null);
            setCents(0);
            setInTune(false);
          }

          rafId = requestAnimationFrame(detect);
        };

        detect();
      } catch (err) {
        console.error("Mic access denied");
      }
    };

    start();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      audioContext?.close();
    };
  }, []);

  const targetNote = activeStringIdx !== null ? STRINGS[activeStringIdx].note : "-";
  const targetOctave = activeStringIdx !== null ? STRINGS[activeStringIdx].octave : "";

  const needleRotation = Math.max(-45, Math.min(45, cents));

  const HeadstockPeg = ({ idx, side }: { idx: number, side: 'left' | 'right' }) => {
    const s = STRINGS[idx];
    const isActive = activeStringIdx === idx;
    const isTuned = tunedStrings.has(idx);

    return (
      <div className={`flex items-center gap-4 ${side === 'right' ? 'flex-row-reverse' : ''}`}>
        <button
          onClick={() => setManualModeIdx(idx)}
          className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex flex-col items-center justify-center font-bold text-xl sm:text-2xl border-[3px] transition-all cursor-pointer relative shadow-[inset_0_4px_10px_rgba(255,255,255,0.1),0_5px_15px_rgba(0,0,0,0.5)] ${isActive
            ? inTune
              ? "bg-gradient-to-b from-green-400 to-green-600 border-green-300 text-white shadow-[0_0_25px_#4ade80]"
              : "bg-gradient-to-b from-red-500 to-red-700 border-red-400 text-white shadow-[0_0_25px_#ef4444]"
            : isTuned
              ? "bg-gradient-to-b from-[#1a2e1d] to-[#0b140c] border-[#22c55e]/50 text-green-400 shadow-[0_0_10px_rgba(74,222,128,0.1)]"
              : "bg-gradient-to-b from-[#3a3a45] to-[#25252e] border-[#52525b] text-gray-300 hover:from-[#4a4a55] hover:to-[#35353e]"
            }`}
        >
          {s.note}
          <span className="text-[10px] absolute bottom-1 sm:bottom-2 font-normal opacity-70">{s.octave}</span>

          {/* Manual indicator */}
          {manualModeIdx === idx && (
            <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-blue-500 rounded-full border-2 border-[#1a1a24] shadow-[0_0_8px_#3b82f6]" />
          )}

          {/* Successfully tuned indicator */}
          {!isActive && isTuned && (
            <div className="absolute top-1 sm:top-1.5 left-1 sm:left-1.5 w-2 h-2 bg-green-400 rounded-full shadow-[0_0_5px_#4ade80]" />
          )}
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0d0d12] text-white flex flex-col items-center justify-center py-6 px-4 selection:bg-purple-500/30 font-sans relative overflow-y-auto">

      {!isListening && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 px-4 py-2 rounded-full text-sm z-50 whitespace-nowrap">
          Allow microphone access to tune
        </div>
      )}

      {/* Premium UI Header */}
      <div className="relative w-full flex justify-center items-center">

        {/* LEFT CORNER TOGGLE */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#1a1a24] p-1.5 rounded-full flex gap-1 border border-white/5 shadow-xl">
          <button
            onClick={() => setManualModeIdx(null)}
            className={`relative px-6 py-2 rounded-full text-xs sm:text-sm font-bold tracking-widest uppercase transition-all z-10 ${manualModeIdx === null ? "text-white" : "text-gray-500 hover:text-gray-300"
              }`}
          >
            {manualModeIdx === null && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 bg-blue-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.6)] -z-10"
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            )}
            Auto
          </button>

          <button
            onClick={() => {
              if (manualModeIdx === null) setManualModeIdx(0);
            }}
            className={`relative px-6 py-2 rounded-full text-xs sm:text-sm font-bold tracking-widest uppercase transition-all z-10 ${manualModeIdx !== null ? "text-white" : "text-gray-500 hover:text-gray-300"
              }`}
          >
            {manualModeIdx !== null && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 bg-blue-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.6)] -z-10"
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            )}
            Manual
          </button>
        </div>

        {/* CENTERED TITLE */}
        <div className="flex flex-col items-center mt-4 sm:mt-0 mb-4 sm:mb-6 text-center">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tighter mb-2 flex items-center gap-3">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-500 to-blue-600">
              Pro
            </span>
            Tuner
          </h1>
          <p className="text-[#3b82f6] opacity-80 text-[10px] sm:text-xs tracking-[0.3em] uppercase font-bold">
            Studio Grade Precision
          </p>
        </div>

      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-24 w-full max-w-5xl mt-2 mb-4 lg:mb-8 flex-grow">
        {/* Headstock Simulator */}
        <div className="relative w-full max-w-[360px] lg:max-w-[400px] mb-8 lg:mb-0">
          {/* Headstock Background */}
          <div className="absolute inset-x-4 sm:inset-x-6 top-0 bottom-[-40px] bg-gradient-to-b from-[#1a1a24] to-[#0d0d12] rounded-t-[3rem] border-t-2 border-x-2 border-white/5 shadow-2xl" />

          {/* Realistic Strings Graphic */}
          <div className="absolute inset-x-0 bottom-[-40px] top-4 flex justify-center gap-[10px] sm:gap-[12px] pointer-events-none opacity-60">
            {/* E (Low) */} <div className="w-[4px] bg-gradient-to-r from-gray-500 via-gray-300 to-gray-600 shadow-[0_0_3px_black] h-full rounded-full" />
            {/* A */}       <div className="w-[3px] bg-gradient-to-r from-gray-500 via-gray-300 to-gray-600 shadow-[0_0_3px_black] h-full rounded-full" />
            {/* D */}       <div className="w-[2.5px] bg-gradient-to-r from-gray-500 via-gray-300 to-gray-600 shadow-[0_0_3px_black] h-full rounded-full" />
            {/* G */}       <div className="w-[2px] bg-gradient-to-r from-gray-400 via-gray-200 to-gray-500 shadow-[0_0_2px_black] h-full rounded-full" />
            {/* B */}       <div className="w-[1.5px] bg-gradient-to-r from-gray-300 via-white to-gray-400 shadow-[0_0_2px_black] h-full rounded-full" />
            {/* e (High) */} <div className="w-[1px] bg-gradient-to-r from-gray-300 via-white to-gray-400 shadow-[0_0_2px_black] h-full rounded-full" />
          </div>

          {/* Pegs Layout */}
          <div className="relative z-10 flex justify-between px-0 sm:px-2 pt-10 pb-4">
            <div className="flex flex-col gap-6 sm:gap-8">
              <HeadstockPeg idx={2} side="left" /> {/* D */}
              <HeadstockPeg idx={1} side="left" /> {/* A */}
              <HeadstockPeg idx={0} side="left" /> {/* E */}
            </div>
            <div className="flex flex-col gap-6 sm:gap-8 mt-16 sm:mt-20">
              <HeadstockPeg idx={3} side="right" /> {/* G */}
              <HeadstockPeg idx={4} side="right" /> {/* B */}
              <HeadstockPeg idx={5} side="right" /> {/* e */}
            </div>
          </div>
        </div>

        {/* Main Dial Simulator */}
        <div className="relative w-full max-w-sm bg-[#111116] p-6 pb-8 sm:p-8 rounded-[3rem] shadow-[inset_0_2px_5px_rgba(255,255,255,0.05),0_30px_60px_rgba(0,0,0,0.7)] border-t border-x border-[#2a2a35] overflow-hidden flex flex-col items-center z-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1d1d27] to-[#0f0f13]">

          {/* Target Note Display */}
          <div className="text-7xl font-black tracking-tighter mt-4" style={{ color: inTune && activeStringIdx !== null ? "#4ade80" : "#fff" }}>
            {targetNote}
          </div>

          <div className="mt-4 mb-2 text-gray-500 font-mono text-sm tracking-widest font-bold">
            {freq > 0 && activeStringIdx !== null ? `${freq.toFixed(1)} HZ` : "--- HZ"}
          </div>

          {/* Arc Track / Tuning Mechanism */}
          <div className="relative w-full h-28 overflow-hidden flex justify-center items-end border-t-2 border-white/10 rounded-t-full mt-6 bg-[#0d0d12]/30">

            {/* Ticks */}
            <div className="absolute bottom-0 w-full flex justify-center">
              <div className="w-[2px] h-6 bg-gray-600 absolute rotate-[-45deg] origin-bottom -ml-[140px]" />
              <div className="w-[3px] h-8 bg-green-500 absolute shadow-[0_0_8px_#4ade80]" />
              <div className="w-[2px] h-6 bg-gray-600 absolute rotate-[45deg] origin-bottom ml-[140px]" />
            </div>

            {/* Ball Indicator */}
            {activeStringIdx !== null && (
              <div className="absolute bottom-2 w-full px-8">
                <div className="w-full h-1 bg-gradient-to-r from-red-500/20 via-green-500/20 to-red-500/20 rounded-full relative">
                  <motion.div
                    className={`w-7 h-7 rounded-full absolute -top-3 -ml-3.5 shadow-xl border-2 border-[#16161f] ${inTune ? "bg-green-500 shadow-[0_0_15px_#4ade80]" : "bg-red-500 shadow-[0_0_15px_#ef4444]"
                      }`}
                    animate={{ left: `${50 + (needleRotation / 45) * 45}%` }}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Labels below dial */}
          <div className="w-full max-w-[280px] flex justify-between mt-6 text-[10px] sm:text-xs font-bold tracking-widest text-gray-500 px-2 sm:px-4 uppercase">
            <span className={activeStringIdx !== null && cents < -5 ? "text-red-400" : ""}>Too Low</span>
            <span className={activeStringIdx !== null && inTune ? "text-green-400" : ""}>Perfect</span>
            <span className={activeStringIdx !== null && cents > 5 ? "text-red-400" : ""}>Too High</span>
          </div>
        </div>
      </div>

      <p className="mt-4 text-gray-500 text-xs sm:text-sm text-center max-w-md transition-opacity duration-500">
        {manualModeIdx === null
          ? "🎸 Auto Mode: Automatically locks into the closest string."
          : "🔒 Manual Mode: Tap a peg to explicitly lock tuning to that string."}
      </p>

    </div>
  );
}