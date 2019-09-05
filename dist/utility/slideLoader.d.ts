declare type LoaderCallback = (error: string | undefined, element: HTMLCanvasElement | HTMLImageElement | null) => void;
interface SlideLoader {
    getSlide: (url: string, completion: LoaderCallback, z: number, x: number, y: number) => void;
}
declare class BasicSlideLoader implements SlideLoader {
    private errorMessage;
    getSlide(url: string, completion: LoaderCallback): void;
}
declare class StackSlideLoader {
    private stack;
    private activeQueries;
    readonly loader: SlideLoader | null;
    readonly queryLimit: number;
    constructor(loader: SlideLoader, queryLimit: number);
    private startNextLoad;
    getSlide(url: string, completion: LoaderCallback, z: number, x: number, y: number): void;
}
export { BasicSlideLoader, StackSlideLoader };
