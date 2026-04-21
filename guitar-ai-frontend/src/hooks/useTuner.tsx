import { useEffect, useState } from "react";
import { PitchDetector } from "pitchy";
import { CHORDS, frequencyToNote } from "../utils/utils.js";

export function useTuner(selectedChord: string | null) {
  const [note, setNote] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    if (!selectedChord) return;

    let audioContext: AudioContext;
    let analyser: AnalyserNode;
    let source: MediaStreamAudioSourceNode;

    const start = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      audioContext = new AudioContext();
      analyser = audioContext.createAnalyser();
      source = audioContext.createMediaStreamSource(stream);

      source.connect(analyser);

      const detector = PitchDetector.forFloat32Array(analyser.fftSize);
      const input = new Float32Array(detector.inputLength);

      const detect = () => {
        analyser.getFloatTimeDomainData(input);

        const [pitch, clarity] = detector.findPitch(
          input,
          audioContext.sampleRate
        );

        if (clarity > 0.9 && pitch) {
          const detectedNote = frequencyToNote(pitch);
          setNote(detectedNote);

          const validNotes = CHORDS[selectedChord];

          const match = validNotes.some((n) =>
            detectedNote.startsWith(n[0]) // basic match
          );

          setIsCorrect(match);
        }

        requestAnimationFrame(detect);
      };

      detect();
    };

    start();

    return () => {
      audioContext?.close();
    };
  }, [selectedChord]);

  return { note, isCorrect };
}