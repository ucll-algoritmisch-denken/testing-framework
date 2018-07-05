import React from 'react';
import Collapsible from 'react-collapsible';
import './hint-viewer.scss';


export interface IProps
{

}

export interface IState
{

}

export class HintViewer extends React.Component<IProps, IState>
{
    constructor(props : IProps)
    {
        super(props);
    }

    public render()
    {
        return (
            <div className="hint-viewer">
                <Collapsible trigger={createHeader()} transitionTime={100}>
                    {this.props.children}
                </Collapsible>
            </div>
        );


        function createHeader()
        {
            return (
                <React.Fragment>
                    hint
                </React.Fragment>
            );
        }
    }
}