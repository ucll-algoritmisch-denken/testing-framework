import React, { ChangeEvent } from 'react';
import PropTypes from 'prop-types';
import './validated-input.scss';


export interface IProps
{
    validator: (input : string) => boolean;
}

export interface IState
{
    input: string;
}

export class ValidatedInput extends React.Component<IProps, IState>
{
    constructor(props : IProps)
    {
        super(props);

        this.state = { 
            input: ''
        };
    }

    public render()
    {
        const me = this;

        return (
            <input type="text" value={this.state.input} onChange={onChange} className={determineClass()} />
        );


        function determineClass()
        {
            const classNames : string[] = [ 'validated-input' ];

            if ( me.state.input.length !== 0 )
            {
                 if ( me.isCorrect() )
                {
                    classNames.push('correct');
                }
                else
                {
                    classNames.push('incorrect');
                }
            }

            return classNames.join(" ");
        }

        function onChange(e : ChangeEvent<HTMLInputElement>) : void
        {
            const input = e.target.value;

            me.setState({ input });
        }
    }

    private isCorrect() : boolean
    {
        return this.props.validator(this.state.input);
    }

    public static propTypes = {
        validator: PropTypes.func.isRequired,
    };
}
