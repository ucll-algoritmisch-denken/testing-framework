import React from 'react';
import { IAssertion } from "./assertion";
import { decorate } from './decorator';
import './box.scss';
import { Outcome } from 'outcome';


export function box<T>(header : JSX.Element, assertion : IAssertion<T>) : IAssertion<T>
{
    return decorate(decorator, assertion);


    function decorator(outcome : Outcome, content : JSX.Element) : JSX.Element
    {
        return (
            <div className="assertion-box">
                <header>
                    {header}
                </header>
                <div className="assertion-box-contents">
                    {content}
                </div>
            </div>
        );
    }
}