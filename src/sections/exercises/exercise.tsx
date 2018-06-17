import React from 'react';
import { ISection } from "chapter";
import { Outcome, outcomeToHtmlClass } from '../../outcome';
import { isInteger } from '../../type';
import { DifficultyViewer } from '../../components/difficulty-viewer';
import { IScored } from '../../score';
import { IHasDifficulty, difficulty } from '../../difficulty';


export abstract class Exercise implements ISection
{
    private testCaseIndex : number;

    constructor(public id : string, public tocEntry : JSX.Element, public difficulty : difficulty)
    { 
        if ( !isInteger( difficulty ) )
        {
            throw new Error(`Difficulty should be integer`);
        }
        else
        {
            this.testCaseIndex = 0;
        }
    }

    abstract hasDifficulty() : this is IHasDifficulty;

    abstract readonly content : JSX.Element;

    abstract isScored() : this is IScored;

    /**
     * Creates the container in which the exercise resides.
     * 
     * @param exerciseHtmlClass Extra class name to identify the type of exercise.
     * @param contents Contents of the container.
     */
    protected createExerciseContainer(exerciseHtmlClass : string, contents : JSX.Element) : JSX.Element
    {
        const className : string = [ exerciseHtmlClass, "exercise" ].join(" ");

        return (
            <section className={className}>
                {contents}
            </section>
        );
    }

    protected createExerciseHeader(header : JSX.Element) : JSX.Element
    {
        return (
            <header>
                <DifficultyViewer difficulty={this.difficulty} />
                {header}
            </header>
        );
    }

    protected createDescriptionContainer(contents : JSX.Element) : JSX.Element
    {
        return (
            <div className="description">
                {contents}
            </div>
        );
    }

    protected createTestCasesContainer(contents : JSX.Element) : JSX.Element
    {
        return (
            <div className="test-cases">
                {contents}
            </div>
        );
    }

    protected createTestCaseContainer(outcome : Outcome, contents : JSX.Element) : JSX.Element
    {
        const className : string = [ 'test-case', outcomeToHtmlClass(outcome) ].join(' ');

        return (
            <section className={className} key={`test-case-${this.testCaseIndex++}`}>
                {contents}
            </section>
        );
    }
}
