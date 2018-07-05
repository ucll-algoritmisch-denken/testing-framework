import React from 'react';
import * as Type from 'type';
import { DieViewer } from './die-viewer';


export interface IProps
{
    dice : number[];
}

export interface IState
{

}

export class DiceViewer extends React.Component<IProps, IState>
{
    constructor(props : IProps)
    {
        super(props);
    }

    public render()
    {
        const me = this;

        return (
            <span className="dice-viewer">
                {createDice()}
            </span>
        );


        function createDice()
        {
            return me.props.dice.map( createDie );
        }

        function createDie(die : number, index : number) : JSX.Element
        {
            return <DieViewer die={die} key={`die-viewer-${index}`} />;
        }
    }

    public static propTypes = {
        dice: function(props : any, propName : string, componentName : string) : Error | undefined {
            const value = props[propName];

            if ( !Type.array(Type.number).hasType(value) || !value.every(x => 1 <= x && x <= 6) )
            {
                return new Error(`${propName} should be assigned an array of values between 1 and 6`);
            }
            else
            {
                return undefined;
            }
        }
    };
}
