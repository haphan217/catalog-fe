import { useState } from "react";
import { Modal, Button } from "@ahaui/react";
import { Category, Item } from "utils/Types";

interface Props {
  type: string;
  item: Category | Item;
  onDelete: () => void;
}

export default function DeleteModal({ type, item, onDelete }: Props) {
  const [show, setShow] = useState(false);

  const onToggle = () => {
    setShow(!show);
  };

  const deleteItem = () => {
    onDelete();
    onToggle();
  };
  return (
    <>
      <span className="u-widthFull" onClick={onToggle}>
        Delete {type}
      </span>
      {show && (
        <Modal size="small" show={show} onHide={onToggle}>
          <Modal.Header closeButton>
            <Modal.Title>Delete {type}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Are you sure you want to delete {type} {item.name}?
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" width="full" onClick={onToggle}>
              Calcel
            </Button>
            <Button variant="accent" width="full" onClick={deleteItem}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}
