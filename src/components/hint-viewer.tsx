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
            <section className="hint-viewer">
                <Collapsible trigger={createHeader()} transitionTime={100}>
                    <div className="contents">
                        {this.props.children}
                    </div>
                </Collapsible>
            </section>
        );


        function createHeader()
        {
            return (
                <div className="header">
                    Hint
                </div>
            );
        }
    }
}