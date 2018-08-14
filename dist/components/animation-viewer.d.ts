import React from 'react';
import 'rc-slider/assets/index.css';
import './animation-viewer.scss';
export interface IProps {
    duration: number;
    animationSpeed: number;
    renderFrame: (timestamp: number) => JSX.Element;
}
export interface IState {
    currentTime: number;
    rafId: number | undefined;
}
export declare class AnimationViewer extends React.Component<IProps, IState> {
    private lastTick;
    constructor(props: IProps);
    componentWillUnmount(): void;
    private startAnimation;
    private stopAnimation;
    render(): JSX.Element;
    private endReached;
    private changeTime;
    private isPlaying;
    private onButtonClick;
    private backToBeginning;
    private update;
    private rescheduleFrameIfNecessary;
    private incrementCurrentTime;
    private collectTime;
}
