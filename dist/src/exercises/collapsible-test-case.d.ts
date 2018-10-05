import { ITestCase } from "./test-case";
import { Outcome } from "../outcome";
export declare abstract class CollapsibleTestCase implements ITestCase {
    protected abstract readonly header: JSX.Element;
    protected abstract readonly content: JSX.Element;
    abstract readonly outcome: Outcome;
    render(): JSX.Element;
}
