import React from 'react';


export interface IProps
{
    colorAt : (x : number, y : number) => string | undefined;

    gridWidth : number;

    gridHeight : number;

    blockSize : number;

    padding ?: number;

    className ?: string;
}

export interface IState
{
}

export class SvgColorGrid extends React.Component<IProps, IState>
{
    constructor(props : IProps)
    {
        super(props);
    }

    render()
    {
        const { gridWidth, gridHeight, blockSize, colorAt } = this.props;
        const padding = this.props.padding || 2;
        const blocks : JSX.Element[] = [];

        for ( let y = 0; y !== gridHeight; ++y )
        {
            for ( let x = 0; x !== gridWidth; ++x )
            {
                const blockColor = colorAt(x, y);

                if ( blockColor  )
                {
                    const key = `r${x}-${y}`;
                    const cx = x * (blockSize + padding) + padding;
                    const cy = y * (blockSize + padding) + padding;
                    const width = blockSize;
                    const height = blockSize;

                    const rectangle = (
                        <rect key={key}  x={cx} y={cy} width={width} height={height} fill={blockColor} />
                    );

                    blocks.push(rectangle);
                }
            }
        }

        const totalWidth = gridWidth * (blockSize + padding) + padding;
        const totalHeight = gridHeight * (blockSize + padding) + padding;

        return (
            <svg width={totalWidth} height={totalHeight} className={this.props.className}>
                {blocks}
            </svg>
        );
    }
}