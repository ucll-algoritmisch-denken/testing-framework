import React from 'react';
import { ITestCase } from "./test-case";
import { Outcome } from "../outcome";
import Collapsible from "react-collapsible";


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