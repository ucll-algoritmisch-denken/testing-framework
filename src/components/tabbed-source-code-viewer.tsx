import React from 'react';
import { SourceCodeViewer } from './sourcecode-viewer';
import { SourceCode } from '../source-code';
import { TabControl, Tab } from './tab-control';


export interface ISourceTab
{
    label : string;
    sourceCode : SourceCode;
}

export interface IProps
{
    children: ISourceTab[];
}

export interface IState
{

}

export class TabbedSourceCodeViewer extends React.Component<IProps, IState>
{
    constructor(props : IProps)
    {
        super(props);
    }

    render()
    {
        const me = this;

        return (
            <TabControl>
                {tabs()}
            </TabControl>
        );

        
        function tabs()
        {
            return me.props.children.map(tab => {
                return <Tab key={tab.label} label={tab.label}>
                    <SourceCodeViewer sourceCode={tab.sourceCode} />
                </Tab>;
            });
        }
    }
}
