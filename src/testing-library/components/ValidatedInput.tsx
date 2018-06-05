import React, { ChangeEvent } from 'react';
import PropTypes from 'prop-types';


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
            if ( me.state.input.length === 0 )
            {
                return '';
            }
            else if ( me.isCorrect() )
            {
                return 'correct';
            }
            else
            {
                return 'incorrect';
            }
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
