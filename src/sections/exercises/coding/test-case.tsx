import React from 'react';
import Collapsible from 'react-collapsible';
import { Outcome } from "../../../outcome";


export interface ITestCase
{
    render() : JSX.Element;

    readonly outcome : Outcome;
}

export abstract class CollapsibleTestCase implements ITestCase
{
    protected abstract readonly header : JSX.Element;

    protected abstract readonly content : JSX.Element;

    public abstract readonly outcome : Outcome;

    public render()
    {
        return (
            <Collapsible trigger={this.header} transitionTime={100}>
                {this.content}
            </Collapsible>
        );
    }
}
