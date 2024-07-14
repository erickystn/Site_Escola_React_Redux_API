import { useEffect, useState } from 'react';
import { Container } from '../../styles/GlobalStyle';
import axios from '../../services/axios.js';
import { toast } from 'react-toastify';
import { FaEdit, FaUser, FaWindowClose } from 'react-icons/fa';
import { AlunoContainer, AlunoItem } from './styled.js';
import { primaryColor } from '../../config/colors.js';

import { Link } from 'react-router-dom';
import Loading from '../../components/Loading/index.js';

export default function Alunos() {
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get('/alunos');
        setAlunos(response.data);
        setLoading(false);
      } catch (err) {
        err.response.errors.forEach((error) => {
          toast.error(error);
        });
      }
    })();
  }, []);
  return (
    <Container>
      <Loading isLoading={loading} />
      <h1>Alunos</h1>
      <AlunoContainer>
        {alunos.map((aluno) => (
          <AlunoItem key={aluno.id}>
            <FaUser size={38} color={primaryColor} />
            <span>
              {aluno.nome} {aluno.sobrenome}
            </span>
            <span>{aluno.email}</span>
            <span>
              <Link to={`/aluno/${aluno.id}/edit`}>
                <FaEdit size={26} color={primaryColor} />
              </Link>
              <Link to={`/aluno/${aluno.id}/delete`}>
                <FaWindowClose size={26} color="red" />
              </Link>
            </span>
          </AlunoItem>
        ))}
      </AlunoContainer>
    </Container>
  );
}
