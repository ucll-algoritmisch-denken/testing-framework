import React from 'react';
import styled from 'styled-components';


export interface Props
{
    className ?: string;

    die : number;
}

const Container = styled.span`
    font-size: 1.5em;
`;


export function DieViewer({die, className} : Props)
{
    return (
        <Container className={className}>
            {String.fromCharCode(0x2680 - 1 + die)}
        </Container>
    );
}
