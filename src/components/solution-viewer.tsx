import React from 'react';
import Collapsible from 'react-collapsible';
import { SourceCodeViewer } from '../components/sourcecode-viewer';
import './solution-viewer.scss';


export interface IProps
{
    sourceCode : string;
}

export interface IState
{

}

export class SolutionViewer extends React.Component<IProps, IState>
{
    constructor(props : IProps)
    {
        super(props);
    }

    public render()
    {
        return (
            <div className="solution-viewer">
                <Collapsible trigger={createHeader()} transitionTime={100}>
                    <SourceCodeViewer sourceCode={this.props.sourceCode} />
                </Collapsible>
            </div>
        );


        function createHeader()
        {
            return (
                <React.Fragment>
                    solution
                </React.Fragment>
            );
        }
    }
}