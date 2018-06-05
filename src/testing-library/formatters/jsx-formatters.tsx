import React from 'react';
import { isArray, isString, isNumber } from "testing-library/type";
import { allEqual } from 'testing-library/util';
import { Bitmap } from 'testing-library/bitmap';
import { BitmapViewer } from 'testing-library/components/bitmap-viewer';
import _ from 'lodash';
import { Invalid } from 'testing-library/components/invalid';
import { convertToString } from 'testing-library/formatters/string-formatters';


export function jsxify(x : JSX.Element | string)
{
    if ( isString(x) )
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

export function code(str : string | JSX.Element) : JSX.Element
{
    return (
        <span style={createStyle()}>{jsxify(str)}</span>
    );


    function createStyle()
    {
        return {
            fontFamily: 'monospace'
        };
    }
}

export function grayscaleBitmap(x : any) : JSX.Element
{
    if ( !isArray(x) )
    {
        return invalid("Should be an array");
    }
    else if ( !_.every(x, isArray) )
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
        return isNumber(x) && 0 <= x && x <= 255 && Math.floor(x) === x;
    }

    function invalid(message : string)
    {
        return (
            <Invalid message={message} value={x} />
        );
    }
}

export function RgbBitmap(x : any) : JSX.Element
{
    if ( !isArray(x) )
    {        
        return invalid("Should be an array");
    }
    else if ( !_.every(x, isArray) )
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