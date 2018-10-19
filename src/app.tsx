import React from 'react';
import Sidebar from 'react-sidebar';
import { ISection } from 'chapter';
import { TableOfContents } from 'components/table-of-contents';
import { IChapter } from 'chapter';
import './app.scss';


export interface IProps
{
    chapter : IChapter;

    version : string;
}

export interface IState
{
    sidebarOpen : boolean;

    currentSectionIndex : number;
}

export class App extends React.Component<IProps, IState> {
    constructor(props : IProps)
    {
        super(props);

        if ( props.chapter.sections.length === 0 )
        {
            throw new Error("No sections defined");
        }
        else
        {
            this.state = { currentSectionIndex: 0, sidebarOpen: true };
        }
    }
    
    render() {
        const me = this;
        
        return (
            <React.Fragment>
                <div className="title">
                    <span className="caption">{this.props.chapter.title}</span>
                    <span className="version">{this.props.version}</span>
                </div>
                <div className="top-container" onKeyDown={(e) => onKeyDown(e)}>
                    <Sidebar sidebar={createSidebarContent()} docked={this.state.sidebarOpen}>
                        <div className="section-container" key={`section-${this.state.currentSectionIndex}`}>
                            {this.props.chapter.sections[this.state.currentSectionIndex].content}
                        </div>
                    </Sidebar>
                </div>
            </React.Fragment>
        );

        function createSidebarContent()
        {
            return (
                <TableOfContents sections={me.props.chapter.sections} onSectionSelected={(index, section) => me.onSectionSelected(index, section)} />
            );
        }

        function onKeyDown(e : React.KeyboardEvent<HTMLDivElement>)
        {
            console.log(`key down ${e}`);

            if ( e.key === 'S' && e.ctrlKey )
            {
                me.setState( { sidebarOpen: !me.state.sidebarOpen } );
            }
        }
    }

    private onSectionSelected(index : number, _section : ISection)
    {
        this.setState( { currentSectionIndex: index } );
    }
}
