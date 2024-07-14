import PropTypes from 'prop-types';
import { Loader } from './styled';

export default function Loading({ isLoading = false }) {
  if (!isLoading) {
    return <></>;
  }

  return (
    <Loader>
      <div></div>
      <p>Carregando Dados</p>
    </Loader>
  );
}

Loading.propTypes = {
  isLoading: PropTypes.bool,
};
