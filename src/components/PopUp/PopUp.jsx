import { Modal } from "flowbite-react";

export function PopUp({ openModal, setOpenModal, children, size }) {
  function onCloseModal() {
    setOpenModal(false);
  }

  return (
    <>
      <Modal show={openModal} size={size ? size : 'xl'} onClose={onCloseModal} popup className="z-[99999999999999999]">
        <Modal.Header />
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </>
  );
}
