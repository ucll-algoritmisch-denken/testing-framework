import React from 'react';
import { functionality } from 'car-simulation';
import './car-simulation-summary.scss';
import { CarFunctionalitySymbol } from './car-functionality-symbol';


export interface IProps
{
    allowedFunctionality : functionality[];
}

export interface IState
{

}

export class CarSimulationSummary extends React.Component<IProps, IState>
{
    constructor(props : IProps)
    {
        super(props);
    }

    public render()
    {
        const me = this;

        return (
            <div className="car-simulation-summary">
                {createAllowedFunctionalitySymbols()}
            </div>
        );

        
        function createAllowedFunctionalitySymbols()
        {
            return me.props.allowedFunctionality.map(functionality => {
                return (
                    <CarFunctionalitySymbol functionality={functionality} />
                );
            });
        }
    }
}