import { Color } from './color';
export declare class Bitmap {
    width: number;
    height: number;
    private pixelData;
    constructor(width: number, height: number, pixelData: Uint8ClampedArray);
    writeTo(xs: Uint8ClampedArray): void;
    toDataURL(): string;
    toColor(): Color[][];
    toGrayscale(): number[][];
    toBlackAndWhite(): boolean[][];
    private toMatrix;
    static fromBlackAndWhite(pixels: boolean[][]): Bitmap;
    static fromGrayscale(pixels: number[][]): Bitmap;
    static fromColors(pixels: Color[][]): Bitmap;
    static fromMatrix<T>(matrix: T[][], f: (t: T) => Color): Bitmap;
}
export declare function loadImage(path: string): Promise<Bitmap>;
