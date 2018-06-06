import React from 'react';
import ReactDOM from 'react-dom';

import { createShell } from './shell';
import { App } from './view';

import { IChapter } from './chapter';

export { Score } from './score';
export { IChapter, ISection } from './chapter';
export { IFunctionRepository, fromWindow as createFunctionRepositoryFromWindow } from './function-repository';


import * as InterpretationExercise from './sections/exercises/interpretation';
import * as TestBasedCodingExercise from './sections/exercises/coding';
import * as ReferenceImplementationBasedCodingExercise from './sections/exercises/by-reference-implementation';

export const Exercise = {
    Interpretation: InterpretationExercise,
    Coding: {
        TestBased: TestBasedCodingExercise,
        ReferenceImplementationBased : ReferenceImplementationBasedCodingExercise
    }
};


export { code } from './formatters/jsx-formatters';
export { convertToString } from './formatters/string-formatters';

export { callFunction, IFunctionCallResults, monadicCallFunction, formatFunction, parseFunction } from './function-util';

import * as Assertions from './assertions';
export { Assertions };

// export { Maybe, Just, Nothing } from './maybe';

export { loadImage } from './bitmap';

export async function initialize(chapter : IChapter)
{
    (window as any).shell = createShell(chapter);
    
    ReactDOM.render(<App chapter={chapter} />, document.getElementById('app'));
}
