import React from 'react';
import styled from 'styled-components';
import { SourceCode } from '../source-code';
import { LanguageComparison } from './language-comparison';


export interface IProps
{
    children : SourceCode[];

    className ?: string;
}

export interface IState
{

}

const StyledDiv = styled.div`
    width: 80%;
    margin: 1em auto;
`;

export class ExistingImplementations extends React.Component<IProps, IState>
{
    render()
    {
        return (
            <StyledDiv className={this.props.className}>
                <LanguageComparison>
                    {this.props.children}
                </LanguageComparison>
            </StyledDiv>
        );
    }
}
