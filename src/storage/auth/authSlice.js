import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axios from '../../services/axios';

const initialStates = {
  isLoggedIn: false,
  token: '',
  user: {},
  isLoading: false,
};

// cria os reducers e action dinamicamente
export const authSlice = createSlice({
  name: 'auth',
  initialState: { ...initialStates },
  reducers: {
    authSuccess: (state, { payload }) => {
      state.isLoggedIn = true;
      state.user = payload.user;
      state.token = payload.token;
      state.isLoading = false;
    },
    authFailed: (state, { payload }) => {
      payload?.errors?.forEach?.((error) => toast.error(error, { delay: 500 }));
      delete axios?.defaults?.headers?.common?.Authorization;
      return initialStates;
    },
    authRequest: (state) => {
      state.isLoading = true;
    },
    cadastroFailed: (state, { payload }) => {
      payload?.errors?.forEach?.((error) => toast.error(error));
      state.isLoading = false;
    },
    cadastroSuccess: (state, { payload }) => {
      state.user = { ...state.user, ...payload };
      state.isLoading = false;
    },
    cadastroRequest: (state) => {
      state.isLoading = true;
    },
  },
});

export const {
  authRequest,
  authFailed,
  authSuccess,
  cadastroFailed,
  cadastroRequest,
  cadastroSuccess,
} = authSlice.actions;
// gera actions baseado nos nomes dos reducers definidos no createSlice
// o atributo type do action é gerado nos dados do createSlice nesse caso seria: 'botao/botaoClicado'

export const selectAuth = (state) => state.auth;
// o attributo em "state.***.value"  *** é o mesmo nome dado ao reducer ao ser passado em:
// configureStore({ reducer: { auth: authSlice } });

export default authSlice.reducer;

// feito baseado no exemplo:
// https://codesandbox.io/s/github/reduxjs/redux-essentials-counter-example/tree/master/?from-embed=&file=/src/app/store.js
