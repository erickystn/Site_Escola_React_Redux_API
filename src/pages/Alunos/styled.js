import styled from 'styled-components';
import { primaryColor } from '../../config/colors';

export const AlunoContainer = styled.div`
margin: 20px 0;
display: flex;
flex-direction: column;

div + div{
  border-top: 1.5px solid ${primaryColor + '80'};

}

`;

export const AlunoItem = styled.div`
display: flex;
justify-content: space-around;
align-items: center;
gap:5px;
padding: 16px 0;

a:first-of-type{
  margin-right:16px;
}
`;
