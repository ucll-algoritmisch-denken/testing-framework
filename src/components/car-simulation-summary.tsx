import React from 'react';
import { functionality } from '../car-simulation';
import './car-simulation-summary.scss';
import { CarFunctionalitySymbol } from './car-functionality-symbol';


export interface IProps
{
    allowedFunctionality : functionality[];

    maxSteps ?: number;
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
                {createAllowedFunctionalitySection()}
                {createMaximumStepsSection()}
            </div>
        );


        function createAllowedFunctionalitySection()
        {
            return (
                <React.Fragment>
                    <div className='header'>
                        functionality
                    </div>
                    <div className='functionality'>
                        {createAllowedFunctionalitySymbols()}
                    </div>
                </React.Fragment>
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

        function createMaximumStepsSection()
        {
            if ( me.props.maxSteps )
            {
                return (
                    <React.Fragment>
                        <div className='header'>
                            steps
                        </div>
                        <div className='max-steps'>
                            {me.props.maxSteps}
                        </div>
                    </React.Fragment>
                );
            }
            else
            {
                return (
                    <React.Fragment />
                );
            }
        }

    }
}