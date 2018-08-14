import { IAssertion } from '.';
import { ComparisonAssertion } from './comparison';
export declare abstract class ApproximatelyAssertion extends ComparisonAssertion<number> {
    protected abstract readonly epsilon: number;
    protected isCorrect(actual: number): boolean;
}
export declare function approximately(expected: number, epsilon?: number): IAssertion<number>;
