import React from 'react';
import { SourceCode, Language } from '../source-code';
import { TabbedSourceCodeViewer } from './tabbed-source-code-viewer';



export interface IProps
{
    children : SourceCode[];
}

export interface IState
{

}

export class LanguageComparison extends React.Component<IProps, IState>
{
    render()
    {
        const tabs = this.props.children.map( sc => {
            return {
                sourceCode: sc,
                label: this.stringOfLanguage(sc.language)
            };
        });

        return (
            <TabbedSourceCodeViewer>
                {tabs}
            </TabbedSourceCodeViewer>
        );
    }

    private stringOfLanguage(language : Language) : string
    {
        switch ( language )
        {
        case Language.Python:
            return 'Python';

        case Language.CommonLisp:
            return 'Common Lisp';

        case Language.CPP:
            return 'C++';

        case Language.CSharp:
            return 'C#';

        case Language.Java:
            return 'Java';

        case Language.Factor:
            return 'Factor';

        case Language.JavaScript:
            return 'JavaScript';

        case Language.Pseudocode:
            return 'Pseudocode';

        default:
            throw new Error(`Unknown language`);
        }
    }
}
