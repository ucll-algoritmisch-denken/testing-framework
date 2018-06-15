import React from 'react';
import { functionality } from '../car-simulation';
import './car-functionality-symbol.scss';


export interface IProps
{
    functionality : functionality;
}

export interface IState
{

}

export class CarFunctionalitySymbol extends React.Component<IProps, IState>
{
    constructor(props : IProps)
    {
        super(props);
    }

    public render()
    {
        const me = this;

        return (
            <span className="allowed-functionality">
                {createSymbol()}
            </span>
        );


        function createSymbol() : string
        {
            const functionality = me.props.functionality;

            if ( functionality === 'forward' )
            {
                return String.fromCharCode(0x2191);
            }
            else if ( functionality === 'sensor' )
            {
                return String.fromCharCode(0x2307);
            }
            else if ( functionality === 'turnLeft')
            {
                return String.fromCharCode(0x21B6);
            }
            else if ( functionality === 'turnRight')
            {
                return String.fromCharCode(0x21B7);
            }
            else
            {
                throw new Error("Invalid functionality");
            }
        }
    }
}