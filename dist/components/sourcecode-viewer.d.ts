import React from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/python/python';
import 'codemirror/mode/clike/clike';
import 'codemirror/theme/neat.css';
import './sourcecode-viewer.scss';
import { SourceCode } from '../source-code';
export interface IProps {
    sourceCode: SourceCode;
}
export interface IState {
}
export declare class SourceCodeViewer extends React.Component<IProps, IState> {
    render(): JSX.Element;
}
