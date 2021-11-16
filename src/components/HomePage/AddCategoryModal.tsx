import { useState } from "react";
import { Button, Modal, Icon, Form } from "@ahaui/react";
import { Category } from "utils/Types";
import BaseModal from "components/common/BaseModal";
import { useAppDispatch } from "store/store";
import { hideModal } from "store/slices/modalSlice";

export interface AddCateProps {
  setShowDropdown?: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmitCategory: (c: Category) => void;
}

export default function AddCategoryModal({ setShowDropdown, onSubmitCategory }: AddCateProps) {
  const [category, setCategory] = useState<Category>({ name: "" });

  const dispatch = useAppDispatch();

  const closeModal = () => {
    dispatch(hideModal());
  };

  const onSubmit = () => {
    onSubmitCategory(category);
    closeModal();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory({ ...category, name: event.target.value });
  };

  const modalBody = (
    <>
      <Form.Group controlId="name">
        <Form.Label>Category name</Form.Label>
        <Form.Input type="text" onChange={handleInputChange} value={category.name}></Form.Input>
      </Form.Group>
    </>
  );

  return (
    <BaseModal
      header="Add Category"
      body={modalBody}
      primaryBtn="Add"
      onClickPrimary={onSubmit}
      onClose={closeModal}
      secondaryBtn="Cancel"
    />
  );
}
