export interface FrameCacheItem {
  image: HTMLImageElement | null;
  bitmap: ImageBitmap | null;
  status: 'idle' | 'loading' | 'loaded' | 'error';
}

export class FrameLoader {
  private totalFrames: number;
  private basePath: string;
  private cache: Map<number, FrameCacheItem> = new Map();
  private activeLoads: number = 0;
  private maxConcurrentLoads: number = 8;
  private isDestroyed: boolean = false;
  private priorityLoadedCount: number = 0;
  private priorityTarget: number = 15;

  private onProgress?: (loadedCount: number, totalCount: number, isPriorityDone: boolean) => void;
  private onFrameLoaded?: (index: number, bitmap: ImageBitmap | HTMLImageElement) => void;

  constructor(totalFrames: number, basePath: string = '/frames') {
    this.totalFrames = totalFrames;
    this.basePath = basePath;
    this.initCache();
  }

  private initCache() {
    for (let i = 1; i <= this.totalFrames; i++) {
      this.cache.set(i, {
        image: null,
        bitmap: null,
        status: 'idle',
      });
    }
  }

  public setCallbacks(
    onProgress?: (loadedCount: number, totalCount: number, isPriorityDone: boolean) => void,
    onFrameLoaded?: (index: number, bitmap: ImageBitmap | HTMLImageElement) => void
  ) {
    this.onProgress = onProgress;
    this.onFrameLoaded = onFrameLoaded;
  }

  public getFramePath(index: number): string {
    const paddedIndex = String(index).padStart(4, '0');
    return `${this.basePath}/frame_${paddedIndex}.webp`;
  }

  public getFrame(index: number): ImageBitmap | HTMLImageElement | null {
    const item = this.cache.get(index);
    if (!item || item.status !== 'loaded') return null;
    return item.bitmap || item.image;
  }

  public getLoadedFrameCount(): number {
    let count = 0;
    for (let i = 1; i <= this.totalFrames; i++) {
      const status = this.cache.get(i)?.status;
      if (status === 'loaded' || status === 'error') count++;
    }
    return count;
  }

  /**
   * Preloads priority frames first, then starts lazy preloading for the rest.
   */
  public preload() {
    this.isDestroyed = false;
    this.priorityTarget = Math.min(this.priorityTarget, this.totalFrames);
    
    // Step 1: Preload priority frames in parallel
    const priorityPromises: Promise<any>[] = [];
    for (let i = 1; i <= this.priorityTarget; i++) {
      priorityPromises.push(this.loadFramePromise(i));
    }

    Promise.allSettled(priorityPromises).then(() => {
      if (this.isDestroyed) return;
      
      // Notify priority done
      this.notifyProgress(true);
      
      // Step 2: Lazy preload the remaining frames progressively
      this.preloadRemaining();
    });
  }

  private loadFramePromise(index: number): Promise<ImageBitmap | HTMLImageElement> {
    const item = this.cache.get(index);
    if (!item || item.status === 'loaded' || item.status === 'loading') {
      if (item?.status === 'loaded') return Promise.resolve(item.bitmap || item.image!);
      return new Promise((resolve) => {
        const checkInterval = setInterval(() => {
          if (item?.status === 'loaded') {
            clearInterval(checkInterval);
            resolve(item.bitmap || item.image!);
          } else if (item?.status === 'error') {
            clearInterval(checkInterval);
            resolve(null as any);
          }
        }, 100);
      });
    }

    item.status = 'loading';
    this.activeLoads++;

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = this.getFramePath(index);
      
      img.onload = async () => {
        if (this.isDestroyed) {
          this.activeLoads--;
          item.status = 'idle';
          reject(new Error('Loader destroyed'));
          return;
        }

        item.image = img;
        
        // Try creating ImageBitmap for GPU hardware accelerated rendering
        if (typeof window !== 'undefined' && 'createImageBitmap' in window) {
          try {
            const bitmap = await createImageBitmap(img);
            item.bitmap = bitmap;
          } catch (err) {
            console.warn(`[FrameLoader] Fallback to HTMLImageElement for frame ${index}`, err);
          }
        }

        item.status = 'loaded';
        this.activeLoads--;
        
        if (index <= this.priorityTarget) {
          this.priorityLoadedCount++;
        }

        if (this.onFrameLoaded) {
          this.onFrameLoaded(index, item.bitmap || item.image!);
        }

        this.notifyProgress(false);
        resolve(item.bitmap || item.image!);
      };

      img.onerror = () => {
        item.status = 'error';
        this.activeLoads--;
        console.error(`[FrameLoader] Failed to load frame ${index} at: ${img.src}`);
        this.notifyProgress(false);
        resolve(null as any); // Resolve instead of reject to keep Promise.allSettled happy
      };
    });
  }

  private preloadRemaining() {
    if (this.isDestroyed) return;

    // Create a queue of remaining frames
    const queue: number[] = [];
    for (let i = this.priorityTarget + 1; i <= this.totalFrames; i++) {
      if (this.cache.get(i)?.status === 'idle') {
        queue.push(i);
      }
    }

    if (queue.length === 0) {
      this.notifyProgress();
      return;
    }

    let nextQueueIndex = 0;

    const worker = async () => {
      while (!this.isDestroyed && nextQueueIndex < queue.length) {
        const frameIndex = queue[nextQueueIndex++];
        try {
          await this.loadFramePromise(frameIndex);
        } catch (e: any) {
          if (!this.isDestroyed && e?.message !== 'Loader destroyed') {
            console.error(`Error loading frame ${frameIndex} in worker`, e);
          }
        }
      }
    };

    // Spin up workers for parallel loading
    const workerCount = Math.min(this.maxConcurrentLoads, queue.length);
    for (let i = 0; i < workerCount; i++) {
      worker();
    }
  }

  private notifyProgress(forcePriorityDone: boolean = false) {
    if (this.onProgress && !this.isDestroyed) {
      const loaded = this.getLoadedFrameCount();
      const isPriorityDone = forcePriorityDone || this.priorityLoadedCount >= this.priorityTarget;
      this.onProgress(loaded, this.totalFrames, isPriorityDone);
    }
  }

  /**
   * Destroys loader, cleans up image bitmap references from GPU memory to prevent memory leaks.
   */
  public destroy() {
    this.isDestroyed = true;
    this.cache.forEach((value) => {
      if (value.bitmap) {
        value.bitmap.close();
      }
      value.image = null;
      value.bitmap = null;
      value.status = 'idle';
    });
    this.cache.clear();
    this.activeLoads = 0;
    this.priorityLoadedCount = 0;
  }
}
