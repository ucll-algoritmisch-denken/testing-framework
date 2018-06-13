import React from 'react';
import './play-pause-button.scss';


export enum Mode
{
    Play,
    Pause,
    Restart
}

export interface IProps
{
    mode : Mode;
    onClick : () => void;
}

export interface IState
{

}

export class PlayPauseButton extends React.Component<IProps, IState>
{
    constructor(props : IProps)
    {
        super(props);
    }

    render()
    {
        const me = this;

        return (
            <div className="play-pause-button" onClick={() => me.onToggle()}>
                <span>
                    {determineSymbol()}
                </span>
            </div>
        );


        function determineSymbol() : JSX.Element
        {
            if ( me.props.mode === Mode.Play )
            {
                return (
                    <React.Fragment>
                        &#x23f5;
                    </React.Fragment>
                );
            }
            else if ( me.props.mode === Mode.Pause )
            {
                return (
                    <React.Fragment>
                        &#x23f8;
                    </React.Fragment>
                );
            }
            else if ( me.props.mode === Mode.Restart )
            {
                return (
                    <React.Fragment>
                        &#8635;
                    </React.Fragment>
                );
            }
            else
            {
                throw new Error("Invalid mode");
            }
        }
    }

    private onToggle() : void
    {
        this.props.onClick();
    }
}