import React from 'react';
import Sidebar from 'react-sidebar';
import { ISection, IChapter } from './chapter';
import { SectionOverview } from './components/section-overview';
import './app.scss';


export interface IProps
{
    chapter : IChapter;

    version : string;
}

export interface IState
{
    sidebarOpen : boolean;

    selectedSectionIndex : number;
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
            this.state = { selectedSectionIndex: 0, sidebarOpen: true };
        }
    }

    render() {
        const me = this;

        // tabindex required to receive key events
        return (
            <React.Fragment>
                <div className="title">
                    <span className="caption">{this.props.chapter.title}</span>
                    <span className="version">{this.props.version}</span>
                </div>
                <div className="top-container" onKeyDown={(e) => onKeyDown(e)} tabIndex={0}>
                    <Sidebar sidebar={renderSidebarContent()} docked={this.state.sidebarOpen}>
                        <div className="section-container" key={`section-${this.state.selectedSectionIndex}`} tabIndex={0}>
                            {this.props.chapter.sections[this.state.selectedSectionIndex].content}
                        </div>
                    </Sidebar>
                </div>
            </React.Fragment>
        );

        function renderSidebarContent()
        {
            return (
                <SectionOverview sections={me.props.chapter.sections} onSectionSelected={(index, section) => me.onSectionSelected(index, section)} selectedSectionIndex={me.state.selectedSectionIndex} />
            );
        }

        function onKeyDown(e : React.KeyboardEvent<HTMLDivElement>)
        {
            if ( e.key === ' ' && e.ctrlKey )
            {
                me.setState( { sidebarOpen: !me.state.sidebarOpen } );
            }
        }
    }

    private onSectionSelected(index : number, _section : ISection)
    {
        this.setState( { selectedSectionIndex: index } );
    }
}
