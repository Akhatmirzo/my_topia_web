import { Modal } from "flowbite-react";

export function PopUp({ openModal, setOpenModal, children, size }) {
  function onCloseModal() {
    setOpenModal(false);
  }

  return (
    <>
      <Modal show={openModal} size={size ? size : 'xl'} onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </>
  );
}
