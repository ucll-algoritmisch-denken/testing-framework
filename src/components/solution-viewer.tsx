import React from 'react';
import Collapsible from 'react-collapsible';
import { SourceCodeViewer } from './sourcecode-viewer';
import './solution-viewer.scss';
import { SourceCode, Language } from '../source-code';


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
        const sourceCode = new SourceCode(Language.JavaScript, this.props.sourceCode).beautify();

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