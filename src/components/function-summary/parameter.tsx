import React from 'react';
import { Box } from './box';


export interface Props
{
    className ?: string;

    name : string;

    type : string;
}


export class Parameter extends React.Component<Props>
{
    render() : JSX.Element
    {
        return (
            <Box className={this.props.className} category='parameter' name={this.props.name} type={this.props.type}>
                {this.props.children}
            </Box>
        );
    }
}
