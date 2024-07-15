import { useEffect, useState } from 'react';
import { Container } from '../../styles/GlobalStyle';
import axios from '../../services/axios.js';
import { toast } from 'react-toastify';
import { FaEdit, FaUser, FaWindowClose } from 'react-icons/fa';
import { AlunoContainer, AlunoItem } from './styled.js';
import { primaryColor } from '../../config/colors.js';
import MeuModal from '../../components/MeuModal';
// import axios from '../../services/axios.js';

import { Link } from 'react-router-dom';
import Loading from '../../components/Loading/index.js';

export default function Alunos() {
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [idAluno, setIdAluno] = useState(undefined);

  const [show, setShow] = useState(false);

  const handleCloseModal = () => {
    setShow(false);
    setIdAluno(undefined);
  };

  const handleShowModal = () => setShow(true);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(`/alunos/${idAluno}`);
      setAlunos(alunos.filter((aluno) => aluno.id !== idAluno));
      setLoading(false);
    } catch (err) {
      const status = err?.response?.status;

      setLoading(false);
      if (status && status == 401) {
        toast.error('Login requerido!');
      }
      toast.error('Erro ao deletar aluno');
    }

    handleCloseModal();
    setIdAluno(undefined);
  };

  useEffect(() => {
    if (idAluno) {
      handleShowModal();
    }
  }, [idAluno]);

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
      <MeuModal
        handleClose={handleCloseModal}
        handleAction={handleDelete}
        show={show}
      />
      <Loading isLoading={loading} />
      <h1>Alunos</h1>
      <AlunoContainer>
        {alunos.map((aluno, index) => (
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
              <Link onClick={(e) => setIdAluno(aluno.id)} to="#">
                <FaWindowClose size={26} color="red" />
              </Link>
            </span>
          </AlunoItem>
        ))}
      </AlunoContainer>
    </Container>
  );
}
