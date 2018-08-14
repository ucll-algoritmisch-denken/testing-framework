import React from 'react';
import { SourceCode } from 'source-code';
export interface IProps {
    children: SourceCode[];
}
export interface IState {
}
export declare class LanguageComparison extends React.Component<IProps, IState> {
    render(): JSX.Element;
    private stringOfLanguage;
}
