import React from 'react';
import { IScoredSection } from "chapter";
import { Score } from "score";
import { Outcome, outcomeToHtmlClass } from '../../outcome';


export abstract class Exercise implements IScoredSection
{
    private testCaseIndex : number;

    constructor(public id : string, public tocEntry : JSX.Element)
    { 
        this.testCaseIndex = 0;
    }

    abstract readonly content : JSX.Element;

    isScored() : this is IScoredSection
    {
        return true;
    }

    abstract score : Score;

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
