import React from 'react';
import { DieViewer } from './die-viewer';


export interface Props
{
    dice : number[];

    className ?: string;
}


export function DiceViewer({dice, className} : Props)
{
    return (
        <span className={className}>
            {createDice()}
        </span>
    );

    function createDice()
    {
        return dice.map( createDie );
    }

    function createDie(die : number, index : number) : JSX.Element
    {
        return <DieViewer die={die} key={`die-viewer-${index}`} />;
    }
}
