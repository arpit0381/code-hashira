'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { FrameLoader } from '@/lib/frameLoader';
import { calculateCoverPosition, progressToFrameIndex, lerpFrameIndex } from '@/lib/scrollController';

export interface UseFrameSequenceProps {
  totalFrames: number;
  basePath?: string;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  scrollProgress: number; // Controlled by ScrollTrigger progress (0 to 1)
}

export function useFrameSequence({
  totalFrames,
  basePath = '/frames',
  canvasRef,
  scrollProgress,
}: UseFrameSequenceProps) {
  const [hasFrames, setHasFrames] = useState<boolean | null>(null); // null means detecting
  const [isPreloading, setIsPreloading] = useState(true);
  const [loadedPercent, setLoadedPercent] = useState(0);
  const [isPriorityDone, setIsPriorityDone] = useState(false);
  const [loadError, setLoadError] = useState(false);

  const loaderRef = useRef<FrameLoader | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const currentFrameRef = useRef<number>(2);
  const targetFrameRef = useRef<number>(2);

  // Video resolution metadata (1280x720 is the default scaled extracted resolution)
  const imageSize = useRef({ width: 1280, height: 720 });

  // 1. Detect if WebP frames are available in the public directory
  useEffect(() => {
    const checkFramesExist = async () => {
      try {
        const testPath = `${basePath}/frame_0002.webp`;
        const res = await fetch(testPath, { method: 'HEAD' });
        
        if (res.ok) {
          setHasFrames(true);
        } else {
          // If HEAD is not supported, try a regular GET request
          const getRes = await fetch(testPath);
          if (getRes.ok) {
            setHasFrames(true);
          } else {
            console.warn('[useFrameSequence] WebP frames not found. Falling back to video mode.');
            setHasFrames(false);
            setIsPreloading(false);
            setIsPriorityDone(true);
          }
        }
      } catch (err) {
        console.error('[useFrameSequence] Check failed, falling back to video.', err);
        setHasFrames(false);
        setIsPreloading(false);
        setIsPriorityDone(true);
      }
    };

    checkFramesExist();
  }, [basePath]);

  // 2. Initialize FrameLoader if frames are available
  useEffect(() => {
    if (hasFrames !== true) return;

    const loader = new FrameLoader(totalFrames, basePath);
    loaderRef.current = loader;

    loader.setCallbacks(
      (loaded, total, isPriDone) => {
        const pct = Math.round((loaded / total) * 100);
        setLoadedPercent(pct);
        setIsPriorityDone(isPriDone);
        
        if (isPriDone) {
          setIsPreloading(false);
        }
      },
      (index, frame) => {
        // Update resolution dynamically based on any loaded frame
        if (frame) {
          imageSize.current = {
            width: frame.width,
            height: frame.height,
          };
        }
      }
    );

    loader.preload();

    return () => {
      loader.destroy();
      loaderRef.current = null;
    };
  }, [hasFrames, totalFrames, basePath]);

  // 3. Keep target frame index updated when scrollProgress changes
  useEffect(() => {
    if (hasFrames !== true) return;
    targetFrameRef.current = progressToFrameIndex(scrollProgress, totalFrames);
  }, [scrollProgress, totalFrames, hasFrames]);

  // 4. Render loop
  const renderFrameOnCanvas = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas || !loaderRef.current) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Get exact frame or find nearest available loaded frame (missing frame recovery)
    let frame = loaderRef.current.getFrame(frameIndex);
    
    if (!frame) {
      // Missing frame recovery: Walk backwards and then forwards to find any loaded frame
      let found = false;
      
      // Look backward
      for (let offset = 1; offset < 10; offset++) {
        const prevIdx = frameIndex - offset;
        if (prevIdx >= 1) {
          frame = loaderRef.current.getFrame(prevIdx);
          if (frame) {
            found = true;
            break;
          }
        }
      }

      // Look forward if not found
      if (!found) {
        for (let offset = 1; offset < 10; offset++) {
          const nextIdx = frameIndex + offset;
          if (nextIdx <= totalFrames) {
            frame = loaderRef.current.getFrame(nextIdx);
            if (frame) {
              found = true;
              break;
            }
          }
        }
      }
    }

    if (!frame) return; // If still not found, wait until preloaded

    // Handle high DPI retina display sizing
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    // Set actual canvas resolution if different
    if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    }

    // Aspect ratio centering calculations
    const pos = calculateCoverPosition(
      { width: canvas.width, height: canvas.height },
      imageSize.current
    );

    // Clear and draw frame on canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Use imageSmoothingEnabled for maximum visual quality
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(frame, pos.x, pos.y, pos.width, pos.height);
  }, [canvasRef, totalFrames]);

  // 5. requestAnimationFrame rendering ticker
  useEffect(() => {
    if (hasFrames !== true || isPreloading) return;

    const tick = () => {
      const target = targetFrameRef.current;
      const current = currentFrameRef.current;
      
      // Smoothly lerp frame index for high-refresh rate display support
      const nextFrame = lerpFrameIndex(current, target, 0.18);
      currentFrameRef.current = nextFrame;

      const roundedFrame = Math.round(nextFrame);
      renderFrameOnCanvas(roundedFrame);

      animationFrameId.current = requestAnimationFrame(tick);
    };

    animationFrameId.current = requestAnimationFrame(tick);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [hasFrames, isPreloading, renderFrameOnCanvas]);

  return {
    hasFrames,
    isPreloading,
    loadedPercent,
    isPriorityDone,
    loadError,
  };
}
