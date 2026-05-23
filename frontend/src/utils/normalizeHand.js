export function normalizeLandmarks(landmarks) {
  // Get wrist position (landmark 0)
  const wrist = landmarks[0];

  // Normalize all points relative to wrist
  const normalized = landmarks.map((point) => ({
    x: point.x - wrist.x,
    y: point.y - wrist.y,
    z: point.z - wrist.z,
  }));

  // Find max value for scaling
  const maxVal = Math.max(
    ...normalized.flatMap((p) => [
      Math.abs(p.x),
      Math.abs(p.y),
      Math.abs(p.z),
    ])
  );

  // Scale to range [-1, 1]
  const scaled = normalized.map((point) => ({
    x: point.x / maxVal,
    y: point.y / maxVal,
    z: point.z / maxVal,
  }));

  // Flatten to array of 63 values
  return scaled.flatMap((p) => [p.x, p.y, p.z]);
}