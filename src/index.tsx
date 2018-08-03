import React from 'react';
import ReactDOM from 'react-dom';

import { createShell } from './shell';
import { App } from './view';

export { IChapter, ISection } from './chapter';
export { IFunctionRepository, fromWindow as createFunctionRepositoryFromWindow } from './function-repository';

export { Outcome } from './outcome';

import * as Exercises from './sections/exercises';
export { Exercises };

export { Explanations } from './sections/explanations';
export { FinishLineSection } from './sections/finish-line-section';

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

import * as CarSimulation from './car-simulation';
export { CarSimulation };

import * as Imaging from './imaging';
export { Imaging };

import { IChapter } from './chapter';

export async function initialize(chapter : IChapter)
{
    document.title = chapter.title;
    (window as any).shell = createShell(chapter);
    
    ReactDOM.render(<App chapter={chapter} />, document.getElementById('app'));
}

import * as Components from './components';
export { Components };

export { IHasDifficulty, difficulty } from './difficulty';
export { IScored, Score } from './score';

import { Maybe } from 'maybe';
export { Maybe };

export { Position2D } from './position2d';
export { Grid } from './grid';

export { Lazy } from './lazy';

export * from './source-code';