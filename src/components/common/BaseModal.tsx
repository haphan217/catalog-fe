import { Modal, Button } from "@ahaui/react";
import { hideModal } from "store/slices/modalSlice";
import { useAppDispatch } from "store/store";
import { ModalProps } from "utils/Types";
const BaseModal = (props: ModalProps) => {
  const { header, body, primaryBtn, secondaryBtn, onClickPrimary, onClickSecondary, onClose } = props;
  const dispatch = useAppDispatch();

  return (
    <Modal show>
      <Modal.Header>
        <Modal.Title>
          <h3 style={{ marginBottom: 0 }}>{header}</h3>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        {secondaryBtn && (
          <Button variant="secondary" onClick={onClickSecondary || onClose}>
            {secondaryBtn}
          </Button>
        )}
        <Button onClick={onClickPrimary}>{primaryBtn}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BaseModal;
