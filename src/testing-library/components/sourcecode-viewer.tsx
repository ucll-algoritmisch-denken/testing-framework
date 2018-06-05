import React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/theme/neat.css';
import './sourcecode-viewer.scss';


export interface IProps
{
    sourceCode : string;
}

export interface IState
{

}

export class SourceCodeViewer extends React.Component<IProps, IState>
{
    render()
    {
        return (
            <CodeMirror value={this.props.sourceCode} onBeforeChange={() => {}} options={{mode: 'javascript', theme: 'neat', readOnly: true, lineNumbers: true}} className='source-code-viewer' />
        );
    }
}
