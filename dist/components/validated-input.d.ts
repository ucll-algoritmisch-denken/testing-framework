import React from 'react';
import PropTypes from 'prop-types';
import './validated-input.scss';
export interface IProps {
    validator: (input: string) => boolean;
}
export interface IState {
    input: string;
}
export declare class ValidatedInput extends React.Component<IProps, IState> {
    constructor(props: IProps);
    render(): JSX.Element;
    private isCorrect;
    static propTypes: {
        validator: PropTypes.Validator<(...args: any[]) => any>;
    };
}
