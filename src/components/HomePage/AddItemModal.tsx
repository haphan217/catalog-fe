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

  const onSubmit = () => {
    onSubmitItem(item);
    console.log(item);
    closeModal();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setItem({ ...item, [id]: value });
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
      header={`${editingItem ? "Edit" : "Add"} Item`}
      body={modalBody}
      primaryBtn={editingItem ? "Edit" : "Add"}
      primaryBtnDisabled={!item.name || !item.description}
      onClickPrimary={onSubmit}
      onClose={closeModal}
      secondaryBtn="Cancel"
    />
  );
}
