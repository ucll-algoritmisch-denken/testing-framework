import { Outcome } from "../../../outcome";
export interface ITestCase {
    render(): JSX.Element;
    readonly outcome: Outcome;
}
export declare abstract class CollapsibleTestCase implements ITestCase {
    protected abstract readonly header: JSX.Element;
    protected abstract readonly content: JSX.Element;
    abstract readonly outcome: Outcome;
    render(): JSX.Element;
}
