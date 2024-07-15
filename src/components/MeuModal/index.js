import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';

export default function MeuModal({ handleClose, handleAction, show }) {
  return (
    <>
      <Modal backdrop="static" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Excluir Aluno</Modal.Title>
        </Modal.Header>
        <Modal.Body>Você deseja realmente excluir Aluno?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Não
          </Button>
          <Button variant="primary" onClick={handleAction}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

MeuModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  handleAction: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};
