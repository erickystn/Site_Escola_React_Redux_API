import { all } from 'redux-saga/effects';

import mySaga from './auth/sagas';

export default function* rootSaga() {
  return yield all([mySaga]);
}
