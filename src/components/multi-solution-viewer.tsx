import React from 'react';
import { SourceCode } from '../source-code';
import { TabbedSourceCodeViewer } from './tabbed-source-code-viewer';
import Collapsible from 'react-collapsible';
import { SolutionViewer } from './solution-viewer';


export interface IProps
{
    solutions : { [key : string] : SourceCode };
}

export interface IState
{

}

/**
 * Shows multiple solutions. Each solution is associated with a label.
 * 
 * If zero solutions are given, the component renders to nothing.
 */
export class MultiSolutionViewer extends React.Component<IProps, IState>
{
    constructor(props : IProps)
    {
        super(props);
    }

    public render()
    {
        const labels = Object.keys(this.props.solutions);

        if ( labels.length > 1 )
        {
            const tabs = labels.map( label => {
                return {
                    sourceCode: this.props.solutions[label],
                    label: label
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
        }
        else if ( labels.length == 1 )
        {
            const label = labels[0];
            const solution = this.props.solutions[label];

            return (
                <SolutionViewer sourceCode={solution} />
            );
        }
        else
        {
            return <React.Fragment />;
        }


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