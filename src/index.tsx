import React from 'react';
import ReactDOM from 'react-dom';

import { IChapter } from 'chapter';
import { createShell } from 'shell';
import { App } from 'view';

export { Score } from 'score';
export { IChapter, ISection } from 'chapter';
export { IFunctionRepository, fromWindow as createFunctionRepositoryFromWindow } from 'function-repository';


// Interpretation exercise
import * as InterpretationExercise from 'sections/exercises/interpretation';
export { InterpretationExercise };

// Test-based coding exercise
import * as TestBasedCodingExercise from 'sections/exercises/coding';
export { TestBasedCodingExercise };

export { build as buildReferenceImplementationExercise } from 'sections/exercises/by-reference-implementation';

export { code } from 'formatters/jsx-formatters';
export { convertToString } from 'formatters/string-formatters';

export { callFunction, IFunctionCallResults, monadicCallFunction, formatFunction } from 'function-util';

import * as Assertions from 'assertions';
export { Assertions };

export { IMaybe, Just, Nothing } from 'maybe';

export async function initialize(chapter : IChapter)
{
    (window as any).shell = createShell(chapter);
    
    ReactDOM.render(<App chapter={chapter} />, document.getElementById('app'));
}
