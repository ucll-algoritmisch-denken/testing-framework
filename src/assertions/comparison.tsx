import { Outcome } from '../outcome';
import { simple } from '../formatters/jsx-formatters';
import './comparison.scss';
import { TabularAssertion, IRow } from './tabular';
import { Maybe } from '../monad';


export abstract class ComparisonAssertion<T> extends TabularAssertion<T>
{
    protected abstract readonly original : Maybe<T>;

    protected abstract readonly expected : Maybe<T>;

    protected abstract isCorrect(actual : T) : boolean;

    protected renderValue(x : T) : JSX.Element
    {
        return simple(x);
    }

    protected get htmlClasses() : string[]
    {
        return super.htmlClasses.concat('comparison');
    }

    protected *generateRows(actual : Maybe<any>, outcome : Outcome) : Iterable<IRow>
    {
        if ( this.original.isJust() )
        {
            yield {
                header: 'original',
                htmlClasses: [ 'original' ],
                content: this.renderOriginalRow(this.original.value)
            };
        }

        if ( this.expected.isJust() )
        {
            yield {
                header: 'expected',
                htmlClasses: [ 'expected' ],
                content: this.renderOriginalRow(this.expected.value)
            };
        }

        if ( actual.isJust() )
        {
            yield {
                header: 'actual',
                htmlClasses: [ 'actual' ],
                content: this.renderOriginalRow(actual.value)
            };
        }
    }

    protected renderOriginalRow(original : any) : JSX.Element
    {
        return this.renderValue(original);
    }

    protected renderExpectedRow(expected : any) : JSX.Element
    {
        return this.renderValue(expected);
    }

    protected renderActualRow(actual : any) : JSX.Element
    {
        return this.renderValue(actual);
    }
}
