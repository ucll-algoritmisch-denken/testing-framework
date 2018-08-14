import React from 'react';
import { SourceCode } from '../source-code';
import { LanguageComparison } from './language-comparison';
import './existing-implementations.scss';


export interface IProps
{
    children : SourceCode[];
}

export interface IState
{

}

export class ExistingImplementations extends React.Component<IProps, IState>
{
    render()
    {
        return (
            <div className="existing-implementations">
                <LanguageComparison>
                    {this.props.children}
                </LanguageComparison>
            </div>
        );
    }
}
