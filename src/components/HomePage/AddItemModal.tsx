import { useState } from "react";
import { Form } from "@ahaui/react";
import { Item } from "utils/Types";
import BaseModal from "components/common/BaseModal";
import { useAppDispatch } from "store/store";
import { hideModal } from "store/slices/modalSlice";
import { createItem, updateItem } from "services/ItemService";
import { keysToCamel } from "utils/functions";
import { ItemDTO } from "utils/DTO";

export interface AddItemProps {
  categoryId: number;
  editingItem?: Item;
  onSubmitItem: (i: Item) => void;
}

export default function AddItemModal({ categoryId, editingItem, onSubmitItem }: AddItemProps) {
  const [serverErr, setServerErr] = useState<string>("");

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

  const onSubmit = async () => {
    try {
      let res;
      if (editingItem) {
        res = await updateItem(categoryId, editingItem.id || 1, item.name, item.description);
      } else {
        res = await createItem(categoryId, item.name, item.description);
      }
      const camelData: Item = keysToCamel(res.data as ItemDTO);
      onSubmitItem(camelData);
      closeModal();
    } catch (error: any) {
      setServerErr(error.response.data.error_message);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setItem({ ...item, [id]: value });
  };

  const modalBody = (
    <>
      <Form.Group controlId="name">
        <Form.Label>Item name</Form.Label>
        <Form.Input isInvalid={!!serverErr} type="text" onChange={handleChange} value={item.name}></Form.Input>
        <Form.Feedback type="invalid" role="alert" visible={!!serverErr}>
          {serverErr}
        </Form.Feedback>
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
