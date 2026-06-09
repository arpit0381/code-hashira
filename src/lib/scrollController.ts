export interface CanvasBounds {
  width: number;
  height: number;
}

export interface ImageBounds {
  width: number;
  height: number;
}

export interface RenderPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Calculates cover positioning (equivalent to object-fit: cover) to paint frames
 * inside the Canvas element dynamically while keeping them centered.
 */
export function calculateCoverPosition(
  canvas: CanvasBounds,
  image: ImageBounds
): RenderPosition {
  const canvasRatio = canvas.width / canvas.height;
  const imageRatio = image.width / image.height;

  let scale = 1;
  if (canvasRatio > imageRatio) {
    // Canvas is wider than image
    scale = canvas.width / image.width;
  } else {
    // Canvas is taller than image
    scale = canvas.height / image.height;
  }

  const width = image.width * scale;
  const height = image.height * scale;
  
  const x = (canvas.width - width) / 2;
  const y = (canvas.height - height) / 2;

  return { x, y, width, height };
}

/**
 * Maps scroll progress (0 to 1) to a target frame index (1 to totalFrames)
 */
export function progressToFrameIndex(
  progress: number,
  totalFrames: number
): number {
  // Clamp progress to [0, 1]
  const clampedProgress = Math.max(0, Math.min(1, progress));
  
  // Calculate target frame starting from frame 2
  const targetFrame = Math.round(clampedProgress * (totalFrames - 2)) + 2;
  
  return targetFrame;
}

/**
 * Lerps frame index for smooth scrubbing
 */
export function lerpFrameIndex(
  current: number,
  target: number,
  lerpFactor: number = 0.15
): number {
  if (Math.abs(target - current) < 0.01) return target;
  return current + (target - current) * lerpFactor;
}
