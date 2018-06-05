import React from 'react';
import { Score } from 'testing-library/score';
import './score-viewer.scss';


export interface IProps
{
    score : Score;
}

export interface IState
{

}

export class ScoreViewer extends React.Component<IProps, IState>
{
    constructor(props : IProps)
    {
        super(props);
    }

    public render()
    {
        const me = this;

        return (
            <table className={determineClassName()}>
                <tbody>
                    <tr>
                        <td className="grade">{this.props.score.grade}</td>
                        <td className="maximum">{this.props.score.maximum}</td>
                    </tr>
                </tbody>
            </table>
        );


        function determineClassName() : string
        {
            const result = [ 'score-viewer' ];

            if ( me.props.score.isPerfect )
            {
                result.push('perfect');
            }
            else if ( me.props.score.grade === 0 )
            {
                result.push('zero');
            }

            return result.join(" ");
        }
    }
}