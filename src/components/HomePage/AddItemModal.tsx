import { useState } from "react";
import { Button, Icon, Form } from "@ahaui/react";
import { Item } from "utils/Types";
import BaseModal from "components/common/BaseModal";
import { useAppDispatch } from "store/store";
import { hideModal } from "store/slices/modalSlice";

export interface AddItemProps {
  editingItem?: Item;
  onSubmitItem: (i: Item) => void;
}

export default function AddItemModal({ editingItem, onSubmitItem }: AddItemProps) {
  const [show, setShow] = useState(false);
  const [item, setItem] = useState<Item>(
    editingItem || {
      name: "",
      description: "",
    },
  );
  const dispatch = useAppDispatch();

  const closeModal = () => {
    dispatch(hideModal());
  };

  const onToggle = () => {
    if (show) {
      setItem(editingItem || { name: "", description: "" });
    }
    setShow(!show);
  };
  const onSubmit = () => {
    onSubmitItem(item);
    console.log(item);
    closeModal();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setItem({ ...item, [id]: value });
  };

  const renderButton = () => {
    if (editingItem)
      return (
        <span className="u-widthFull" onClick={onToggle} role="button">
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

  const modalBody = (
    <>
      <Form.Group controlId="name">
        <Form.Label>Item name</Form.Label>
        <Form.Input type="text" onChange={handleChange} value={item.name}></Form.Input>
      </Form.Group>
      <Form.Group controlId="description">
        <Form.Label>Item description</Form.Label>
        <Form.Input as="textarea" rows={3} onChange={handleChange} value={item.description}></Form.Input>
      </Form.Group>
    </>
  );

  return (
    <BaseModal
      header="Add Item"
      body={modalBody}
      primaryBtn="Add"
      onClickPrimary={onSubmit}
      onClose={closeModal}
      secondaryBtn="Cancel"
    />
  );
}
