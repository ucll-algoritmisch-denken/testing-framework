import React from 'react';
import * as codemirror from 'codemirror';
import { Controlled as CodeMirror, ISetSelectionOptions } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/python/python';
import 'codemirror/mode/clike/clike';
import 'codemirror/theme/neat.css';
import './sourcecode-viewer.scss';
import { Language, SourceCode } from '../source-code';



export interface IProps
{
    sourceCode : SourceCode;
}

export interface IState
{

}

export class SourceCodeViewer extends React.Component<IProps, IState>
{
    render()
    {
        const me = this;

        return (
            <CodeMirror value={this.props.sourceCode.sourceCode} onBeforeChange={() => {}} options={options()} className='source-code-viewer' />
        );

        function options() : codemirror.EditorConfiguration
        {
            return { mode: mode(), theme: 'neat', readOnly: true, lineNumbers: true };
        }

        function mode() : string
        {
            switch ( me.props.sourceCode.language )
            {
                case Language.Java:
                    return 'text/x-java';

                case Language.JavaScript:
                    return 'text/javascript';

                case Language.Python:
                    return 'text/x-python';

                case Language.CSharp:
                    return 'text/x-csharp';

                case Language.CPP:
                    return 'text/x-c++src';

                case Language.CommonLisp:
                    return 'text/plain';

                case Language.Factor:
                    return 'text/plain';

                case Language.Pseudocode:
                    return 'text/plain';

                case Language.Ruby:
                    return 'text/x-ruby';

                default:
                    throw new Error(`Unknown language`);
            }
        }
    }
}
