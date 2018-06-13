import React from 'react';
import Slider from 'rc-slider';
import { Mode, PlayPauseButton } from './play-pause-button';
import 'rc-slider/assets/index.css';
import './animation-viewer.scss';


export interface IProps
{
    duration : number;

    animationSpeed : number;

    renderFrame : (timestamp : number) => JSX.Element;
}

export interface IState
{
    currentTime : number;

    rafId : number | undefined;
}

export class AnimationViewer extends React.Component<IProps, IState>
{
    private lastTick : number;

    constructor(props : IProps)
    {
        super(props);

        this.state = { 
            currentTime: 0,
            rafId: undefined
        };

        this.lastTick = 0;
    }

    componentWillUnmount()
    {
        this.stopAnimation();
    }

    private startAnimation()
    {
        if ( !this.state.rafId )
        {
            this.lastTick = performance.now() / 1000;
            const rafId = requestAnimationFrame(this.update.bind(this));

            this.setState( { rafId } );
        }
    }

    private stopAnimation()
    {
        if ( this.state.rafId )
        {
            cancelAnimationFrame(this.state.rafId);
            const rafId = undefined;

            this.setState( { rafId } );
        }
    }

    public render()
    {
        const me = this;

        return (
            <table className="animation-viewer">
                <tbody>
                    <tr>
                        <td className="animation-container">
                            {this.props.renderFrame(this.state.currentTime)}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className="controls">
                                <Slider className="slider" value={this.state.currentTime * 1000} min={0} max={this.props.duration * 1000} onChange={(t) => this.changeTime(t)} />
                                <PlayPauseButton mode={determineMode()} onClick={() => this.onButtonClick()} />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        );


        function determineMode() : Mode
        {
            if ( me.isPlaying() )
            {
                return Mode.Pause;
            }
            else if ( me.endReached() )
            {
                return Mode.Restart;
            }
            else
            {
                return Mode.Play;
            }
        }
    }

    private endReached() : boolean
    {
        return this.state.currentTime === this.props.duration;
    }

    private changeTime(currentTime : number) : void
    {
        currentTime /= 1000;

        this.setState( { currentTime } );
    }

    private isPlaying() : boolean
    {
        return !!this.state.rafId;
    }

    private onButtonClick()
    {
        if ( this.isPlaying() )
        {
            this.stopAnimation();
        }
        else if ( this.endReached() )
        {
            this.backToBeginning();
            this.startAnimation();
        }
        else
        {
            this.startAnimation();
        }
    }

    private backToBeginning()
    {
        this.setState( { currentTime: 0} );
    }

    private update(timestamp : number)
    {
        const delta = this.collectTime();
        this.incrementCurrentTime(delta);
        this.rescheduleFrameIfNecessary();
    }

    private rescheduleFrameIfNecessary() : void
    {
        if ( this.state.currentTime < this.props.duration )
        {
            const rafId = requestAnimationFrame(this.update.bind(this));
            this.setState( { rafId } );
        }
        else
        {
            const rafId = undefined;
            this.setState( { rafId } );
        }
    }

    private incrementCurrentTime(delta : number) : void
    {
        const currentTime = Math.min(this.state.currentTime + delta, this.props.duration);
        this.setState( { currentTime } );
    }

    private collectTime() : number
    {
        const now = performance.now() / 1000;
        const delta = now - this.lastTick;
        this.lastTick = now;

        return delta * this.props.animationSpeed;
    }
}
