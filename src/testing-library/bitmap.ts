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
    
    toRgb() : number[][][]
    {
        const result = new Array<number[][]>(this.height);
        let index = 0;

        for ( let y = 0; y !== this.height; ++y )
        {
            result[y] = new Array<number[]>(this.width);

            for ( let x = 0; x !== this.width; ++x )
            {
                const r = this.pixelData[index++];
                const g = this.pixelData[index++];
                const b = this.pixelData[index++];
                index++;

                result[y][x] = [r, g, b];
            }
        }

        return result;
    }

    static fromGrayscale(pixels : number[][]) : Bitmap
    {
        const width = pixels[0].length;
        const height = pixels.length;
        
        return Bitmap.fromFunction(width, height, (x, y) => {
            const c = pixels[y][x];

            return new Color(c, c, c);
        });
    }

    static fromRgb(pixels : number[][][]) : Bitmap
    {
        const width = pixels[0].length;
        const height = pixels.length;
        
        return Bitmap.fromFunction(width, height, (x, y) => {
            const [r, g, b] = pixels[y][x];

            return new Color(r, g, b);
        });
    }

    static fromFunction(width : number, height : number, f : (x : number, y : number) => Color) : Bitmap
    {
        const totalSize = width * height * 4;
        const pixelData = new Uint8ClampedArray(totalSize);
        let i = 0;
        
        for ( let y = 0; y !== height; ++y )
        {
            for ( let x = 0; x !== width; ++x )
            {
                const color = f(x, y);

                pixelData[i++] = color.r;
                pixelData[i++] = color.g;
                pixelData[i++] = color.b;
                pixelData[i++] = 255;
            }
        }

        return new Bitmap(width, height, pixelData);
    }
}

export class Color
{
    constructor(public r : number, public g : number, public b : number) { }
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