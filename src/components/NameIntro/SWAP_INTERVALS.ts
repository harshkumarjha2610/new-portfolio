// milliseconds between each frame
export const SWAP_INTERVALS: number[] = [
  70, 65, 60, 65, 60, 70, 65, 60, 65, 70,   // Phase A: fast, roughly even
  75, 80, 85, 90, 95, 100, 110, 120, 130, 145, // Phase A→B: gradual decel
  170, 220, 280,                              // Phase B: settling
  380,                                        // Phase C: final beat before lock-in
];
