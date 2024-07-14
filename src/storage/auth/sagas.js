import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  authRequest,
  authFailed,
  authSuccess,
  cadastroFailed,
  cadastroRequest,
  cadastroSuccess,
} from './authSlice';

import axios from '../../services/axios';
import history from '../../services/history';
import { toast } from 'react-toastify';

function* fazerRequisicaoLogin({ payload }) {
  try {
    const { data } = yield call(axios.post, '/tokens', payload);

    yield put(authSuccess(data));
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    history.push(history?.location?.state?.prevPath || '/');
  } catch (error) {
    yield put(authFailed({ errors: error?.response?.data?.errors }));
    if (error?.response?.status == 401) {
      history.push('/login');
    }
  }
}

function* fazerRequisicaoCadastro({ payload }) {
  const { id, nome, email, password } = payload;
  try {
    if (id) {
      yield call(axios.put, '/users', {
        nome,
        email,
        password: password || undefined,
      });
      toast.success('Atualizado com Sucesso!');
      yield put(cadastroSuccess({ nome, email }));
    } else {
      yield call(axios.post, '/users', { nome, email, password });
      toast.success('Cadastro realizado com sucesso');
      yield put(cadastroSuccess({}));

      history.push('/login');
    }
  } catch (error) {
    yield put(
      cadastroFailed({
        errors: error?.response?.data?.errors || ['Erro desconhecido!'],
      }),
    );
    if (error?.response?.status == 401) {
      yield put(authFailed({ errors: ['Necessário fazer login novamente'] }));
      history.push('/login');
    }
  }
}

export default all([
  takeLatest(authRequest().type, fazerRequisicaoLogin),
  takeLatest(cadastroRequest().type, fazerRequisicaoCadastro),
]);
