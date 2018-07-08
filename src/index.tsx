import React from 'react';
import ReactDOM from 'react-dom';

import { createShell } from './shell';
import { App } from './view';

import { IChapter } from './chapter';

export { IChapter, ISection } from './chapter';
export { IFunctionRepository, fromWindow as createFunctionRepositoryFromWindow } from './function-repository';

export { Outcome } from './outcome';

import * as Exercises from './sections/exercises';
export { Exercises };

export { Explanations } from './sections/explanations';

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
    document.title = chapter.title;
    (window as any).shell = createShell(chapter);
    
    ReactDOM.render(<App chapter={chapter} />, document.getElementById('app'));
}

import * as Components from './components';
export { Components };

export { IHasDifficulty, difficulty } from './difficulty';
export { IScored, Score } from './score';

import { Maybe } from 'tsmonad'; // TODO Should be peer dependency
export { Maybe };
