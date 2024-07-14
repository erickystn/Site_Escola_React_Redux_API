import React from 'react';
import { Router } from 'react-router-dom';
import history from './services/history';
import Header from './components/Header';
import GlobalStyle from './styles/GlobalStyle';
import Routes from './routes';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import storage, { persistor } from './storage';

function App() {
  return (
    <Provider store={storage}>
      <PersistGate loading={null} persistor={persistor}>
        <Router history={history}>
          <Header />
          <Routes />
          <GlobalStyle />
          <ToastContainer autoClose={3000} theme="colored" />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
