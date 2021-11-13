import { useState } from "react";
import { Button, Modal, Icon, Form } from "@ahaui/react";
import { Item } from "utils/Types";

interface Props {
  editingItem?: Item;
  categoryId: number;
}

export default function AddItemModal({ editingItem, categoryId }: Props) {
  const [show, setShow] = useState(false);
  const [item, setItem] = useState<Item>({
    name: editingItem?.name || "",
    description: editingItem?.description || "",
  });

  const onToggle = () => {
    if (show) {
      setItem({ name: editingItem?.name || "", description: editingItem?.description || "" });
    }
    setShow(!show);
  };
  const onSubmit = () => {
    if (item.name && item.description) {
      onToggle();
      console.log(item);
      return;
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setItem({ ...item, [id]: value });
  };

  const renderButton = () => {
    if (editingItem)
      return (
        <span className="u-widthFull" onClick={onToggle}>
          Edit item
        </span>
      );
    else
      return (
        <Button variant="primary" className="u-textTransformNone" onClick={onToggle}>
          <Icon name="plus" role="button" className="u-marginRightTiny" /> Item
        </Button>
      );
  };

  return (
    <>
      {renderButton()}
      {show && (
        <Modal show={show} onHide={onToggle}>
          <Modal.Header closeButton>
            <Modal.Title>{editingItem ? "Edit" : "Add"} Item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Item name</Form.Label>
              <Form.Input type="text" id="name" onChange={handleChange} value={item.name}></Form.Input>
            </Form.Group>
            <Form.Group>
              <Form.Label>Item description</Form.Label>
              <Form.Input
                as="textarea"
                rows={3}
                id="description"
                onChange={handleChange}
                value={item.description}
              ></Form.Input>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onToggle}>
              Cancel
            </Button>
            <Button disabled={!item.name} variant="primary" onClick={onSubmit}>
              {editingItem ? "Edit" : "Add"}
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}
