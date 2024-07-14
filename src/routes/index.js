import { Switch } from 'react-router-dom';
import Login from '../pages/Login';
import Page404 from '../pages/Page404';
import MyRoute from './MyRoute';
import Alunos from '../pages/Alunos';
import Cadastro from '../pages/Cadastro';
import Aluno from '../pages/Aluno';
import Foto from '../pages/Foto';

export default function Routes() {
  return (
    <Switch>
      <MyRoute exact path="/" component={Alunos} />
      <MyRoute path="/cadastro" component={Cadastro} />
      <MyRoute path="/login" component={Login} />
      <MyRoute path="/aluno" component={Aluno} isClosed />
      <MyRoute path="/aluno/:id/edit" component={Aluno} isClosed />
      <MyRoute path="/foto/:id" component={Foto} isClosed />
      <MyRoute path="/" component={Page404} />
    </Switch>
  );
}
