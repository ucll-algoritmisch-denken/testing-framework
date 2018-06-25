import React from 'react';
import { isArray } from 'lodash';


export interface IProps
{
}

export interface IState
{
    selectedTabIndex : number;
}

export class MultiView extends React.Component<IProps, IState>
{
    constructor(props : IProps)
    {
        super(props);

        this.state = { selectedTabIndex: 0 };
    }

    public render()
    {
        const me = this;
        const tabs = this.props.children as any[];

        return (
            <div className="multiview" onClick={() => this.onClick()}>
                {tabs[this.state.selectedTabIndex]}
            </div>
        );
    }

    private onClick()
    {
        const children = this.props.children as any[];
        const selectedTabIndex = (this.state.selectedTabIndex + 1) % children.length;

        this.setState( { selectedTabIndex } );
    }

    public static propTypes = {
        dice: function(props : any, propName : string, componentName : string) : Error | undefined {
            const value = props[propName];

            if ( !isArray(value) )
            {
                return new Error(`${propName} should be assigned an array of components`);
            }
            else
            {
                return undefined;
            }
        }
    };
}
