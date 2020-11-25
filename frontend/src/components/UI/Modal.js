import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function ModalUI(props) {
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{props.children}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Cancel
        </Button>
        <Button variant={props.btnColor} onClick={props.handleSubmit}>
          {props.addButton}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalUI;
