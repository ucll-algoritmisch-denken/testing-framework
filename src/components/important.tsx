import React from 'react';
import styled from 'styled-components';


export interface IProps
{
    className ?: string;
}

export interface IState
{

}

const Box = styled.section`
    margin: 1em auto;
    width: 80%;
`;

const Table = styled.table`
    border-collapse: collapse;
    border: 2px solid #A00;
    background: #FCC;

    td {
        padding: 1em;
    }

    td.side {
        width: 10%;
        background: #FAA;
        text-align: center;
        font-size: 200%;
        font-weight: bold;
        padding: 0.5em;
    }
`;

export class Important extends React.Component<IProps, IState>
{
    constructor(props : IProps)
    {
        super(props);
    }

    public render()
    {
        return (
            <Box className={this.props.className}>
                <Table>
                    <tbody>
                        <tr>
                            <td className="side">⚠</td>
                            <td>
                                {this.props.children}
                            </td>
                            <td className="side">⚠</td>
                        </tr>
                    </tbody>
                </Table>
            </Box>
        );
    }
}