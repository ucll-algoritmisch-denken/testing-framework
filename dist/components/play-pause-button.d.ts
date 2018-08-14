import React from 'react';
import './play-pause-button.scss';
export declare enum Mode {
    Play = 0,
    Pause = 1,
    Restart = 2
}
export interface IProps {
    mode: Mode;
    onClick: () => void;
}
export interface IState {
}
export declare class PlayPauseButton extends React.Component<IProps, IState> {
    constructor(props: IProps);
    render(): JSX.Element;
    private onToggle;
}
