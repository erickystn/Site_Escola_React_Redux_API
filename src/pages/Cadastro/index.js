import { useState } from 'react';
import { Container } from '../../styles/GlobalStyle';
import { isEmail } from 'validator';
import { toast } from 'react-toastify';
import Loading from '../../components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { cadastroRequest, selectAuth } from '../../storage/auth/authSlice';

export default function Cadastro() {
  const { isLoggedIn, user, isLoading } = useSelector(selectAuth);
  const [nome, setNome] = useState(user?.nome || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('');
  const dispache = useDispatch();

  console.log({ isLoggedIn, user, isLoading });

  function handleSubmit(e) {
    e.preventDefault();
    let isValid = true;
    if (!nome || nome.length <= 3) {
      isValid = false;
      toast.error('Nome deve possuir mais que 3 letras');
    }

    if (!isEmail(email)) {
      isValid = false;
      toast.error('Formato inválido de email');
    }
    if ((!isLoggedIn && !password) || (isLoggedIn && password.length > 0)) {
      if (password.length < 6) {
        isValid = false;
        toast.error('Senha deve conter no mínimo 6 caracteres');
      }
      if (password !== confirmarPassword) {
        isValid = false;
        toast.error('Senhas não conferem');
      }
    }

    if (isValid) {
      if (isLoggedIn) {
        dispache(cadastroRequest({ id: user.id, nome, email, password }));
      } else {
        dispache(cadastroRequest({ nome, email, password }));
      }
    }
  }
  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>{isLoggedIn ? 'Alterar Dados' : 'Faça seu Cadastro'}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nome">
          Nome
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite o seu nome"
          />
        </label>
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
        <label htmlFor="confirmaPassword">
          Confirme sua Senha
          <input
            type="password"
            value={confirmarPassword}
            onChange={(e) => setConfirmarPassword(e.target.value)}
            placeholder="Confirme sua senha "
          />
        </label>
        <button type="submit">{isLoggedIn ? 'Atualizar' : 'Cadastrar'}</button>
      </form>
    </Container>
  );
}
