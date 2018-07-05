import { Outcome } from '../outcome';
import { simple } from '../formatters/jsx-formatters';
import { Maybe } from 'tsmonad';
import './comparison.scss';
import { TabularAssertion, IRow } from './tabular';


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
        if ( Maybe.isJust(this.original) )
        {
            yield {
                header: 'original',
                htmlClasses: [ 'original' ],
                content: this.renderOriginalRow(this.original.valueOrThrow())
            };
        }

        if ( Maybe.isJust(this.expected) )
        {
            yield {
                header: 'expected',
                htmlClasses: [ 'expected' ],
                content: this.renderOriginalRow(this.expected.valueOrThrow())
            };
        }

        if ( Maybe.isJust(actual) )
        {
            yield {
                header: 'actual',
                htmlClasses: [ 'actual' ],
                content: this.renderOriginalRow(actual.valueOrThrow())
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
