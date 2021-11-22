import { Modal, Button, Loader } from "@ahaui/react";
import { ModalProps } from "utils/Types";

const BaseModal = (props: ModalProps) => {
  const {
    header,
    body,
    primaryBtn,
    primaryBtnVariant,
    primaryBtnDisabled,
    secondaryBtn,
    onClickPrimary,
    onClickSecondary,
    onClose,
    loading,
  } = props;

  return (
    <Modal show>
      <Modal.Header>
        <Modal.Title>
          <h3 style={{ marginBottom: 0 }}>{header}</h3>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        {loading && <Loader data-testid="loader" size="small" />}
        {secondaryBtn && (
          <Button variant="secondary" onClick={onClickSecondary || onClose}>
            {secondaryBtn}
          </Button>
        )}
        <Button variant={primaryBtnVariant || "primary"} onClick={onClickPrimary} disabled={primaryBtnDisabled}>
          {primaryBtn}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BaseModal;
