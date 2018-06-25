import React from 'react';
import * as codemirror from 'codemirror';
import { Controlled as CodeMirror, ISetSelectionOptions } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/theme/neat.css';
import { js_beautify } from 'js-beautify';
import './sourcecode-viewer.scss';


export interface IProps
{
    sourceCode : string;
    skipBeautification ?: boolean;
}

export interface IState
{

}

export class SourceCodeViewer extends React.Component<IProps, IState>
{
    render()
    {
        let sourceCode = this.props.sourceCode;

        if ( !this.props.skipBeautification )
        {
            sourceCode = js_beautify(sourceCode, {
                brace_style: 'expand',
            });
        }

        return (
            <CodeMirror value={sourceCode} onBeforeChange={() => {}} options={options()} className='source-code-viewer' />
        );


        function options() : codemirror.EditorConfiguration
        {
            return { mode: 'javascript', theme: 'neat', readOnly: true, lineNumbers: true };
        }
    }
}
