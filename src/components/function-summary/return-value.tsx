import React from 'react';
import * as ATF from 'algo-testing-framework';
import { range } from 'js-algorithms';
import { styled } from 'algo-testing-framework';
import { Box } from './box';


export interface Props
{
    className ?: string;

    type : string;
}

const StyledBox = styled(Box)`
    margin-top: 5px;
`;

export class ReturnValue extends React.Component<Props>
{
    render() : JSX.Element
    {
        return (
            <StyledBox className={this.props.className} category="return value" type={this.props.type}>
                {this.props.children}
            </StyledBox>
        );
    }
}
