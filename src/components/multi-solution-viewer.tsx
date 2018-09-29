import React from 'react';
import { SourceCode } from '../source-code';
import { TabbedSourceCodeViewer } from './tabbed-source-code-viewer';
import Collapsible from 'react-collapsible';
import { SolutionViewer } from './solution-viewer';
import { Solution } from '../solution-pack';


export interface IProps
{
    solutions : Solution<any[], any>[];
}

export interface IState
{

}

/**
 * Shows multiple solutions. Each solution is associated with a label.
 * 
 * If zero solutions are given, the component renders to nothing.
 */
export class MultiSolutionViewer extends React.Component<IProps, IState> // TODO Add types
{
    constructor(props : IProps)
    {
        super(props);
    }

    public render()
    {
        const solutions = this.props.solutions;

        if ( solutions.length > 1 )
        {
            const tabs = solutions.map( solution => {
                return {
                    sourceCode: solution.sourceCode,
                    label: solution.label
                };
            });

            return (
                <div className="solution-viewer">
                    <Collapsible trigger={header()} transitionTime={100}>
                        <TabbedSourceCodeViewer>
                            {tabs}
                        </TabbedSourceCodeViewer>
                    </Collapsible>
                </div>
            );
        }
        else if ( solutions.length == 1 )
        {
            const solution = solutions[0];
            const sourceCode = solution.sourceCode;

            return (
                <SolutionViewer sourceCode={sourceCode} />
            );
        }
        else
        {
            return null;
        }


        function header()
        {
            return (
                <React.Fragment>
                    solution
                </React.Fragment>
            );
        }
    }
}