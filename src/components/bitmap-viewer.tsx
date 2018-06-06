import * as React from 'react';
import { Bitmap } from 'bitmap';


export interface IProps
{
    bitmap : Bitmap;
}

export interface IState
{

}

export class BitmapViewer extends React.Component<IProps, IState>
{
    private canvas : React.RefObject<HTMLCanvasElement>;

    constructor(props : IProps)
    {
        super(props);

        this.canvas = React.createRef<HTMLCanvasElement>();
    }

    componentDidMount()
    {
        this.forceUpdate();
    }

    render() {
        const me = this;
        const width = this.props.bitmap.width;
        const height = this.props.bitmap.height;

        renderImage();
        
        return (
            <canvas ref={this.canvas} width={width} height={height} />
        );

        function renderImage()
        {
            const canvas = me.canvas.current;

            if ( canvas )
            {
                const context = canvas.getContext('2d');
                
                if ( context )
                {
                    const imageData = context.createImageData(width, height);
                    const pixelData = imageData.data;
                    me.props.bitmap.writeTo(pixelData);
                    context.putImageData(imageData, 0, 0);
                    context.scale(2, 2);
                }
            }
        }
    }
}
