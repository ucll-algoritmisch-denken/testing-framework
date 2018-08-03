import React from 'react';
import './tab-control.scss';


export interface ITabProps
{
    label : string;
}

export class Tab extends React.Component<ITabProps>
{
    render()
    {
        return this.props.children;
    }
}


export interface IProps
{
}

export interface IState
{
    selectedTab : number;
}

export class TabControl extends React.Component<IProps, IState>
{
    constructor(props : IProps)
    {
        super(props);

        this.state = { selectedTab: 0 };
    }

    render()
    {
        const tabs = React.Children.toArray(this.props.children);
        
        const tabLabels = tabs.map( (child, index) => {
            const tab = child as any;
            const label = tab.props.label;
            const isSelected = index === this.state.selectedTab;
            const className = "tab-label" + (isSelected ? " selected" : "");

            return (
                <div className={className} key={label} onClick={() => this.onTabClicked(index)}>
                    {label}
                </div>
            );
        } );

        return (
            <div className='tab-control'>
                <div className='tab-labels'>
                    {tabLabels}
                </div>
                <div className="container">
                    {tabs[this.state.selectedTab]}
                </div>
            </div>
        );
    }

    private onTabClicked(index : number)
    {
        this.setState( { selectedTab: index } );
    }
}
