import { ScoreViewer as UnstyledScoreViewer } from '../score-viewer';
import styled from 'styled-components';


export const ScoreViewer = styled(UnstyledScoreViewer)`
    width: 5em;
    margin: 1px;
`;

export const InvisibleScoreViewer = styled(ScoreViewer)`
    visibility: hidden;
`;