import { createGlobalStyle, styled } from 'styled-components';
import {
  accentColor,
  backgroundColor,
  primaryColor,
  secondaryColor,
} from '../config/colors';
import 'react-toastify/ReactToastify.css';

const GlobalStyle = createGlobalStyle`
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
  outline: none;
}

body, #root{
height: 100%;
background-color: ${accentColor};

}

ul{
  list-style: none;

}

a{
  text-decoration: none;
}

button{
  cursor: pointer;
}

h1{
  text-align: center;
  color: ${accentColor};
  font-size: 30px;
}

form{
  margin: 20px auto;
  width: 70%;
  max-width: 500px;
  display: flex;
  flex-direction: column;


label{
  display: flex;
  flex-direction: column;
  gap:7px;
  font-size: 18px;
  margin-bottom: 12px;

  input{
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 2px;
    border: 1px solid #ccc;
  }
  input:focus{
    outline: 1px solid ${secondaryColor};
  }

}

button[type="submit"]{
    margin-top: 10px;
    background-color: ${primaryColor};
    padding: 10px;
    border-radius: 5px;
    border: none;
    color: white;
    font-weight: 600;
    transition: all 600ms;
    letter-spacing: 1.3px;
    font-size: 18px;

    &:hover{
     filter: brightness(1.3)
    }
  }
}
`;
export default GlobalStyle;

export const Container = styled.section`
max-width: 1140px;
margin: 30px auto;
border-radius: 5px;
background-color: #eee;;
box-shadow: 0 0 10px rgba(0,0,0,0.2);
padding: 20px;
border-radius: 5px;
`;
