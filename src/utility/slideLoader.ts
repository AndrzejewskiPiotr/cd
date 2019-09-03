type LoaderCallback = (
  error: string | undefined,
  element: HTMLCanvasElement | HTMLImageElement | null
) => void;

interface SlideLoader {
  getSlide: (
    url: string,
    completion: LoaderCallback,
    z: number,
    x: number,
    y: number
  ) => void;
}

class BasicSlideLoader implements SlideLoader {
  private errorMessage = 'error';

  getSlide(url: string, completion: LoaderCallback): void {
    const image = document.createElement('img');
    image.src = url;
    image.onload = () => {
      completion(undefined, image);
    };
    image.onerror = () => {
      completion(this.errorMessage, null);
    };
  }
}

type StackLoaderWorkItem = {
  z: number;
  x: number;
  y: number;
  url: string;
  completion: LoaderCallback;
};

class StackSlideLoader {
  private stack: StackLoaderWorkItem[] = [];

  private activeQueries = 0;

  readonly loader: SlideLoader | null = null;

  readonly queryLimit: number = 1;

  constructor(loader: SlideLoader, queryLimit: number) {
    this.loader = loader;
    this.queryLimit = queryLimit;
  }

  private startNextLoad(): void {
    if (this.loader === null) return;
    if (this.stack.length === 0) return;
    if (this.activeQueries >= this.queryLimit) return;
    this.activeQueries += 1;
    const {
      z,
      x,
      y,
      url,
      completion
    } = this.stack.pop() as StackLoaderWorkItem;
    this.loader.getSlide(
      url,
      (error, image) => {
        completion(error, image);
        this.activeQueries -= 1;
        this.startNextLoad();
      },
      z,
      x,
      y
    );
  }

  getSlide(
    url: string,
    completion: LoaderCallback,
    z: number,
    x: number,
    y: number
  ): void {
    this.stack.push({ z, x, y, url, completion });
    this.startNextLoad();
  }
}

export { BasicSlideLoader, StackSlideLoader };
