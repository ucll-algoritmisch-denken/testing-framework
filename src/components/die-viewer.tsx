import React from 'react';
import { isNumber } from 'type';


export interface IProps
{
    die : number;
}

export interface IState
{

}

export class DieViewer extends React.Component<IProps, IState>
{
    constructor(props : IProps)
    {
        super(props);
    }

    render()
    {
        return (
            <span className="die-viewer">
                {String.fromCharCode(0x2680 - 1 + this.props.die)}
            </span>
        );
    }

    static propTypes = {
        die: function(props : any, propName : string, componentName : string) : Error | undefined {
            const value = props[propName];

            if ( !isNumber(value) || value < 1 || value > 6 )
            {
                return new Error(`${propName} should be assigned a value between 1 and 6`);
            }
            else
            {
                return undefined;
            }
        }
    };
}
