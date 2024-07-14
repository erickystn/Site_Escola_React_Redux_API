import storage from 'redux-persist/lib/storage';

import { persistReducer } from 'redux-persist';

const persistConfig = {
  key: 'NOME-APP',
  storage,
  whitelist: ['auth'],
};

export default (reducers) => {
  const persistedReducer = persistReducer(persistConfig, reducers);

  return persistedReducer;
};
