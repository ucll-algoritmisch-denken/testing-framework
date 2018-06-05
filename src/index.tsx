import React from 'react';
import ReactDOM from 'react-dom';

import { IChapter } from 'testing-library/chapter';
import { createShell } from 'testing-library/shell';
import { App } from 'testing-library/view';

export { Score } from 'testing-library/score';
export { IChapter, ISection } from 'testing-library/chapter';
export { IFunctionRepository, fromWindow as createFunctionRepositoryFromWindow } from 'testing-library/function-repository';

export { build as buildInterpretationExercise, IInterpretationExerciseBuilder } from 'testing-library/sections/exercises/interpretation';
export { build as buildTestBasedExercise } from 'testing-library/sections/exercises/coding';
export { build as buildReferenceImplementationExercise } from 'testing-library/sections/exercises/by-reference-implementation';

export async function initialize(chapter : IChapter)
{
    (window as any).shell = createShell(chapter);
    
    ReactDOM.render(<App chapter={chapter} />, document.getElementById('app'));
}

export function foo() { return 4; }