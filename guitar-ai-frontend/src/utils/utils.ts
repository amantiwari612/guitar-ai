export const CHORDS = {
  E: ["E2", "A2", "D3", "G3", "B3", "E4"],
  A: ["A2", "E3", "A3", "C#4", "E4"],
  D: ["D3", "A3", "D4", "F#4"],
};

const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

export function frequencyToNote(freq: number) {
  const A4 = 440;
  const semitone = 12 * Math.log2(freq / A4);
  const noteIndex = Math.round(semitone) + 57;

  return NOTES[noteIndex % 12];
}