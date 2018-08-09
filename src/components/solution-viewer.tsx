import React from 'react';
import Collapsible from 'react-collapsible';
import { SourceCodeViewer } from './sourcecode-viewer';
import { SourceCode, Language } from '../source-code';
import './solution-viewer.scss';


export interface IProps
{
    sourceCode : SourceCode;
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
        const sourceCode = this.props.sourceCode;

        return (
            <div className="solution-viewer">
                <Collapsible trigger={createHeader()} transitionTime={100}>
                    <SourceCodeViewer sourceCode={sourceCode} />
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