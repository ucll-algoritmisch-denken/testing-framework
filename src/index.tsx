import React from 'react';
import ReactDOM from 'react-dom';

import { IChapter } from 'testing-library/chapter';
import { createShell } from 'testing-library/shell';
import { App } from 'testing-library/view';

export { Score } from 'testing-library/score';
export { IChapter, ISection } from 'testing-library/chapter';
export { IFunctionRepository, fromWindow as createFunctionRepositoryFromWindow } from 'testing-library/function-repository';


// Interpretation exercise
import * as InterpretationExercise from 'testing-library/sections/exercises/interpretation';
export { InterpretationExercise };

// Test-based coding exercise
import * as TestBasedCodingExercise from 'testing-library/sections/exercises/coding';
export { TestBasedCodingExercise };

export { build as buildReferenceImplementationExercise } from 'testing-library/sections/exercises/by-reference-implementation';

export { code } from 'testing-library/formatters/jsx-formatters';
export { convertToString } from 'testing-library/formatters/string-formatters';

export { callFunction, IFunctionCallResults, monadicCallFunction, formatFunction } from 'testing-library/function-util';

import * as Assertions from 'testing-library/assertions';
export { Assertions };

export { IMaybe, Just, Nothing } from 'testing-library/maybe';

export async function initialize(chapter : IChapter)
{
    (window as any).shell = createShell(chapter);
    
    ReactDOM.render(<App chapter={chapter} />, document.getElementById('app'));
}
