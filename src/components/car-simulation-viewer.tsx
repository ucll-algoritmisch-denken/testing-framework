import React from 'react';
import { AnimationViewer } from './animation-viewer';
import * as Animation from '../animation';
import * as CarSim from '../car-simulation';
import { IAnimation } from '../animation';
import { Position } from 'js-algorithms';
import { approximately } from '../equality';


export interface IProps
{
    carImage : string;

    simulation : CarSim.Simulation;

    cellSize : number;

    animationSpeed : number;
}

export interface IState
{

}

export class CarSimulationViewer extends React.Component<IProps, IState>
{
    private x : IAnimation<number>;

    private y : IAnimation<number>;

    private theta : IAnimation<number>;

    constructor(props : IProps)
    {
        super(props);

        const animations = this.animateTrace();
        this.x = animations.x;
        this.y = animations.y;
        this.theta = animations.theta;
    }

    public render()
    {
        const duration = Math.min( this.x.duration, this.y.duration, this.theta.duration );

        return (
            <AnimationViewer duration={duration} renderFrame={t => this.renderFrame(t)} animationSpeed={4} />
        );
    }

    private renderFrame(timestamp : number) : JSX.Element
    {
        const me = this;
        const worldWidth = this.props.simulation.world.width * this.props.cellSize;
        const worldHeight = this.props.simulation.world.height * this.props.cellSize;
        const carWidth = this.props.cellSize;
        const carHeight = this.props.cellSize;
        const carPositionX = this.x.at(timestamp);
        const carPositionY = worldHeight - this.y.at(timestamp) - carHeight;
        const carAngle = this.theta.at(timestamp);
        const rotate = `rotate(${-carAngle} ${carPositionX + carWidth / 2} ${carPositionY + carHeight / 2})`;

        return (
            <svg width={worldWidth} height={worldHeight}>
                {renderWorld()}
                <image xlinkHref={this.props.carImage} width={carWidth * 0.8} height={carHeight * 0.8} x={carPositionX + 0.1 * carWidth} y={carPositionY + 0.1 * carHeight} transform={rotate} />
            </svg>
        );


        function renderWorld()
        {
            const world = me.props.simulation.world;
            const result : JSX.Element[] = [];

            for ( let x = 0; x !== world.width; ++x )
            {
                for ( let y = 0; y !== world.height; ++y )
                {
                    const position = new Position(x, y);
                    const cell = world.at(position);
                    const margin = 1;

                    result.push(
                        <rect key={`wall-${x}-${y}`} x={x * carWidth + margin} y ={worldHeight - y * carHeight - carHeight + margin} width={carWidth - 2 * margin} height={carHeight - 2 * margin} fill={determineCellColor(cell)} />
                    );
                }
            }

            return result;


            function determineCellColor(cell : CarSim.Cell)
            {
                if ( cell instanceof CarSim.Wall )
                {
                    return 'black';
                }
                else if ( cell instanceof CarSim.Destination )
                {
                    return '#AFA';
                }
                else if ( cell instanceof CarSim.Empty )
                {
                    return '#AAA';
                }
                else
                {
                    throw new Error("Cannot determine cell color");
                }
            }
        }
    }

    
    animateTrace() : { x : IAnimation<number>, y : IAnimation<number>, theta : IAnimation<number> }
    {
        const trace = this.props.simulation.history;
        const cellSize = this.props.cellSize;
        const stepDuration = 1;
        const initialX = trace.initialState.position.x * cellSize;
        const initialY = trace.initialState.position.y * cellSize;
        const initialTheta = trace.initialState.direction.angleInDegrees;
        let x = new Animation.NumberAnimationBuilder(initialX);
        let y = new Animation.NumberAnimationBuilder(initialY);
        let theta  = new Animation.NumberAnimationBuilder(initialTheta);

        class TraceAnimatorVisitor implements CarSim.ITraceStepVisitor<void>
        {
            forward(trace : CarSim.ForwardTraceStep) : void
            {
                const xTo = trace.to.x * cellSize;
                const yTo = trace.to.y * cellSize;

                x.absoluteTo(xTo, stepDuration);
                y.absoluteTo(yTo, stepDuration);
                theta.constant(stepDuration);
            }

            turnLeft(trace : CarSim.TurnLeftTraceStep) : void
            {
                x.constant(stepDuration);
                y.constant(stepDuration);
                theta.absoluteTo(trace.to.angleInDegrees, stepDuration);
            }

            turnRight(trace : CarSim.TurnRightTraceStep) : void
            {
                x.constant(stepDuration);
                y.constant(stepDuration);

                if ( trace.from.angleInDegrees > trace.to.angleInDegrees )
                {
                    theta.absoluteTo(trace.to.angleInDegrees, stepDuration);
                }
                else
                {
                    const from = trace.from.angleInDegrees + 360;
                    const to = trace.to.angleInDegrees;

                    theta.jump(from);
                    theta.absoluteTo(to, stepDuration);
                }
            }
        }

        
        const visitor = new TraceAnimatorVisitor();

        for ( let step of trace.steps )
        {
            step.visit(visitor);
        }

        const result = { x: x.build(), y: y.build(), theta: theta.build() };

        if ( !approximately(result.x.duration, result.y.duration) || !approximately(result.y.duration, result.theta.duration) )
        {
            throw new Error(`Bug: animations for x, y and theta do not have equal duration`);
        }

        return result;
    }
}
