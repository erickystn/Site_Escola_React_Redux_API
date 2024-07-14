import { useState } from 'react';
import { Container } from '../../styles/GlobalStyle';

import { useDispatch, useSelector } from 'react-redux';
import { authRequest, selectAuth } from '../../storage/auth/authSlice';
import Loading from '../../components/Loading';

export default function Login() {
  const { isLoading } = useSelector(selectAuth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(authRequest({ email, password }));
  }
  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
            placeholder="Digite o seu e-mail "
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite a sua senha "
          />
        </label>

        <button type="submit">Entrar</button>
      </form>
    </Container>
  );
}
