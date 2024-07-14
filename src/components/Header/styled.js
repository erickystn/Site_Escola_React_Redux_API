import styled from 'styled-components';
import { backgroundColor, secondaryColor } from '../../config/colors';

export const Nav = styled.nav`
 background-color: ${secondaryColor};
 padding: 16px;
 display: flex;
 justify-content: center;
 align-items: center;

a{
  color: ${backgroundColor};
  font-weight: 600;
  transition: all .3s;

}
a:hover{
  transform: scale(1.15);
}

a+a{
    margin-left: 1rem;
}
`;
