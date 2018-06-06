import React from 'react';
import { ISection } from 'chapter';
import Sidebar from 'react-sidebar';
import { TableOfContents } from 'components/table-of-contents';
import './view.scss';
import { IChapter } from 'chapter';


export interface IProps
{
    chapter : IChapter;
}

export interface IState
{
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
            this.state = { currentSectionIndex: 0 };
        }
    }
    
    render() {
        const me = this;
        
        return (
            <React.Fragment>
                <div className="title"><span>{this.props.chapter.title}</span></div>
                <div className="top-container">
                    <Sidebar sidebar={createSidebarContent()} docked={true}>
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
    }

    private onSectionSelected(index : number, _section : ISection)
    {
        this.setState( { currentSectionIndex: index } );
    }
}

// async function main()
// {
//     const functionRepository = FunctionRepository.fromWindow();
//     const chapter = await createChapter(functionRepository);
//     (window as any).shell = createShell(chapter);
    
//     ReactDOM.render(<App chapter={chapter} />, document.getElementById('app'));
// }
