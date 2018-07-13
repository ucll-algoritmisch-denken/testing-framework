import React from 'react';
import * as Type from 'type';
import { allEqual } from 'atf-util';
import { Bitmap } from 'bitmap';
import { BitmapViewer } from 'components/bitmap-viewer';
import { Invalid } from 'components/invalid';
import { convertToString } from './string-formatters';
import _ from 'lodash';
import { DiceViewer } from 'components/dice-viewer';
import { InlineCode } from 'components/inline-code';


export function jsxify(x : JSX.Element | string)
{
    if ( Type.string.hasType(x) )
    {
        return (
            <React.Fragment>
                {x}
            </React.Fragment>
        );
    }
    else
    {
        return x;
    }
}


export type IToJsxElement<T> = (t : T) => JSX.Element;


export function simple(x : any) : JSX.Element
{
    return (
        <span>
            {convertToString(x)}
        </span>
    );
}

export function code(str : string) : JSX.Element
{
    return (
        <InlineCode content={str} />
    );
}

export function grayscaleBitmap(x : any) : JSX.Element
{
    if ( !Type.array(Type.any).hasType(x) )
    {
        return invalid("Should be an array");
    }
    else if ( !_.every(x, y => Type.array(Type.any).hasType(y) ) )
    {
        return invalid("All elements should be arrays");
    }
    else 
    {
        const grid : any[][] = x;

        if ( !allEqual( x.map(y => y.length) ) )
        {
            return invalid("All rows should have the same length");
        }
        else if ( !_.every(grid, row => _.every( row, x => isValidPixelValue(x) ) ) )
        {
            return invalid("All values should be integers between 0 and 255");
        }
        else
        {
            const bitmap = Bitmap.fromGrayscale(grid);

            return (
                <BitmapViewer bitmap={bitmap} />
            );
        }
    }


    function isValidPixelValue(x : any)
    {
        return Type.number.hasType(x) && 0 <= x && x <= 255 && Math.floor(x) === x;
    }

    function invalid(message : string)
    {
        return (
            <Invalid message={message} value={x} />
        );
    }
}

export function rgbBitmap(x : any) : JSX.Element
{
    if ( !Type.array(Type.any).hasType(x) )
    {        
        return invalid("Should be an array");
    }
    else if ( !_.every(x, elt => Type.array(Type.any).hasType(elt)) )
    {
        return invalid("All elements should be arrays");
    }
    else 
    {
        const grid : any[][] = x;

        if ( !allEqual( x.map(y => y.length) ) )
        {
            return invalid("All rows should have the same length");
        }
        // TODO More thorough checking
        else
        {
            const bitmap = Bitmap.fromRgb(grid);

            return (
                <BitmapViewer bitmap={bitmap} />
            );
        }
    }

    function invalid(message : string)
    {
        return (
            <Invalid message={message} value={x} />
        );
    }
}

export function dice(ns : number[]) : JSX.Element
{
    return (
        <DiceViewer dice={ns} />
    );
}