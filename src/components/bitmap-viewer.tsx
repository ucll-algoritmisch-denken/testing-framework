import * as React from 'react';
import { Bitmap } from '../imaging';


export interface IProps
{
    bitmap : Bitmap;
    resize ?: { width : number, height : number };
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

    render()
    {
        if ( this.props.resize )
        {
            return <img src={this.props.bitmap.toDataURL()} width={this.props.resize.width} height={this.props.resize.height} style={{imageRendering: 'pixelated'}} />;
        }
        else
        {
            return <img src={this.props.bitmap.toDataURL()} />;
        }
    }
}
