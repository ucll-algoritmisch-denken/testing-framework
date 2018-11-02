import { DifficultyViewer as UnstyledDifficultyViewer } from '../difficulty-viewer';
import styled from 'styled-components';


export const DifficultyViewer = styled(UnstyledDifficultyViewer)`
    width: 4em;
    background: black;
    color: white;
    margin: 1px;
`;

export const InvisibleDifficultyViewer = styled(DifficultyViewer)`
    visibility: hidden;
`;