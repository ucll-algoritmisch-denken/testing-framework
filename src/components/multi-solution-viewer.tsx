import React from 'react';
import { SourceCode } from '../source-code';
import { TabbedSourceCodeViewer } from './tabbed-source-code-viewer';
import Collapsible from 'react-collapsible';


export interface IProps
{
    solutions : { [key : string] : SourceCode };
}

export interface IState
{

}

export class MultiSolutionViewer extends React.Component<IProps, IState>
{
    constructor(props : IProps)
    {
        super(props);
    }

    public render()
    {
        const tabs = Object.keys(this.props.solutions).map( key => {
            return {
                sourceCode: this.props.solutions[key],
                label: key
            };
        });

        return (
            <div className="solution-viewer">
                <Collapsible trigger={createHeader()} transitionTime={100}>
                    <TabbedSourceCodeViewer>
                        {tabs}
                    </TabbedSourceCodeViewer>
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