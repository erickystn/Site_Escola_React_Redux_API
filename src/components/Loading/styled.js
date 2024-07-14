import styled, { keyframes } from 'styled-components';
import { backgroundColor, secondaryColor } from '../../config/colors';

const l3 = keyframes`
    20%{background-position:0%   0%, 50%  50%,100%  50%}
    40%{background-position:0% 100%, 50%   0%,100%  50%}
    60%{background-position:0%  50%, 50% 100%,100%   0%}
    80%{background-position:0%  50%, 50%  50%,100% 100%}
`;

export const Loader = styled.div`
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
background-color: rgba(0, 0, 0, 0.5);
display: flex;
gap:10px;
flex-direction: column;
justify-content: center;
align-items: center;
z-index: 1;

div{
  width: 100px;
  aspect-ratio: 2;
  --_g: no-repeat radial-gradient(circle closest-side, ${secondaryColor} 90%,#0000);
  background:
    var(--_g) 0%   50%,
    var(--_g) 50%  50%,
    var(--_g) 100% 50%;
  background-size: calc(100%/3) 50%;
  animation: ${l3} 1s infinite linear;
  z-index: 2;
}

p{
  color: ${backgroundColor};
  font-size: 26px;
}

`;
