import React from 'react';
import ReactDOM from 'react-dom';

import { createShell } from './shell';
import { App } from 'app';

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

import * as Components from './components';
export { Components };

export { IHasDifficulty, difficulty } from './difficulty';
export { IScored, Score } from './score';

import { IConfiguration, configure } from './configuration';

export { Lazy } from './lazy';

export * from './source-code';
export * from './solution-pack';

export async function initialize(chapter : IChapter, configuration : IConfiguration)
{
    const version = document.getElementsByTagName('head')[0].getAttribute('data-version');

    if ( !version )
    {
        console.error("Missing version! Please add data-version attribute to the html's head element.");
    }
    else
    {
        document.title = chapter.title;
        (window as any).shell = createShell(chapter);

        if ( configuration )
        {
            configure(configuration);
        }

        ReactDOM.render(<App chapter={chapter} version={version} />, document.getElementById('app'));
    }
}

import * as Exercise from './exercises';
export { Exercise };

import * as Sections from './sections';
export { Sections };

import styled from 'styled-components';
export { styled };