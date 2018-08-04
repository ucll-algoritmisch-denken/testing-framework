import { Color } from './color';


export class Bitmap
{
    constructor(public width : number, public height : number, private pixelData : Uint8ClampedArray) { }

    writeTo(xs : Uint8ClampedArray) : void
    {
        const imax = this.width * this.height * 4;

        for ( let i = 0; i !== imax; ++i )
        {
            xs[i] = this.pixelData[i];
        }
    }

    toDataURL() : string
    {
        const canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
        
        const context = canvas.getContext('2d');
        
        if ( !context )
        {
            throw new Error(`Failing to get context`);
        }
        else
        {
            const imageData = context.createImageData(this.width, this.height);
            const pixelData = imageData.data;
            this.writeTo(pixelData);
            context.putImageData(imageData, 0, 0);

            return canvas.toDataURL();
        }
    }
    
    toColor() : Color[][]
    {
        return this.toMatrix<Color>( (r, g, b, a) => new Color(r, g, b) );
    }

    toGrayscale() : number[][]
    {
        return this.toMatrix<number>( (r, g, b, a) => (r + g + b) / 255 );
    }

    toBlackAndWhite() : boolean[][]
    {
        return this.toMatrix<boolean>( (r, g, b, a) => (r + g + b) / 255 < 128 );
    }

    private toMatrix<T>(f : (r : number, g : number, b : number, a : number) => T) : T[][]
    {
        const result = new Array<T[]>(this.height);
        let index = 0;

        for ( let y = 0; y !== this.height; ++y )
        {
            result[y] = new Array<T>(this.width);

            for ( let x = 0; x !== this.width; ++x )
            {
                const r = this.pixelData[index++];
                const g = this.pixelData[index++];
                const b = this.pixelData[index++];
                const a = this.pixelData[index++];

                result[y][x] = f(r, g, b, a);
            }
        }

        return result;
    }

    static fromBlackAndWhite(pixels : boolean[][]) : Bitmap
    {
        return this.fromMatrix(pixels, b => b ? new Color(255, 255, 255) : new Color(0, 0, 0));
    }

    static fromGrayscale(pixels : number[][]) : Bitmap
    {
        return this.fromMatrix(pixels, c => new Color(c, c, c));
    }

    static fromColors(pixels : Color[][]) : Bitmap
    {
        return this.fromMatrix(pixels, c => c);
    }

    static fromMatrix<T>(matrix : T[][], f : (t : T) => Color) : Bitmap
    {
        const width = matrix[0].length;
        const height = matrix.length;
        const totalSize = width * height * 4;
        const pixelData = new Uint8ClampedArray(totalSize);
        let i = 0;
        
        for ( let y = 0; y !== height; ++y )
        {
            for ( let x = 0; x !== width; ++x )
            {
                const color = f(matrix[y][x]);

                pixelData[i++] = color.r;
                pixelData[i++] = color.g;
                pixelData[i++] = color.b;
                pixelData[i++] = 255;
            }
        }

        return new Bitmap(width, height, pixelData);
    }
}

export function loadImage(path : string) : Promise<Bitmap>
{
    const image = new Image();
    image.src = path;
    image.crossOrigin = "Anonymous";
    
    return new Promise((resolve, reject) => {
        image.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = image.width;
            canvas.height = image.height;
            
            const context = canvas.getContext('2d');
            
            if ( !context )
            {
                reject('Failed to get canvas context');
            }
            else
            {
                context.drawImage(image, 0, 0);
                const imageData = context.getImageData(0, 0, image.width, image.height);
                const bitmap = new Bitmap(imageData.width, imageData.height, imageData.data);
                
                resolve(bitmap);
            }
        };
    });
}