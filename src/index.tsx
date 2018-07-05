import React from 'react';
import ReactDOM from 'react-dom';

import { createShell } from './shell';
import { App } from './view';

import { IChapter } from './chapter';

export { IChapter, ISection } from './chapter';
export { IFunctionRepository, fromWindow as createFunctionRepositoryFromWindow } from './function-repository';

export { Outcome } from './outcome';

// import * as ExerciseBase from './sections/exercises/exercise';
// import * as InterpretationExercise from './sections/exercises/interpretation';
// import * as TestBasedCodingExercise from './sections/exercises/coding';
// import * as ReferenceImplementationBasedCodingExercise from './sections/exercises/by-reference-implementation';
// import * as CarSimulatingExercise from './sections/exercises/car-exercise';

// export const Exercise = {
//     Base : ExerciseBase,
//     Interpretation: InterpretationExercise,
//     Coding: {
//         TestBased: TestBasedCodingExercise,
//         ReferenceImplementationBased : ReferenceImplementationBasedCodingExercise
//     },
//     CarSimulation: CarSimulatingExercise
// };

import * as Exercises from './sections/exercises';
export { Exercises };

export { build as createExplanations } from './sections/explanations';

import * as JsxFormatters from './formatters/jsx-formatters';
import * as StringFormatters from './formatters/string-formatters';

export const Formatters = {
    Jsx: JsxFormatters,
    String: StringFormatters
};

import * as Functional from './function-util';
export { Functional };

import * as Assertions from './assertions';
export { Assertions };

import { loadImage } from './bitmap';
export const Imaging = {
    loadImage
};

import * as CarSimulation from './car-simulation';
export { CarSimulation };

export async function initialize(chapter : IChapter)
{
    (window as any).shell = createShell(chapter);
    
    ReactDOM.render(<App chapter={chapter} />, document.getElementById('app'));
}

import * as Components from 'components';
export { Components };

export { IHasDifficulty, difficulty } from './difficulty';
export { IScored, Score } from './score';

import { Maybe } from 'tsmonad'; // TODO Should be peer dependency
export { Maybe };
