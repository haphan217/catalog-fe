import { useState } from "react";
import { Button, Modal, Icon, Form } from "@ahaui/react";
import { Category } from "utils/Types";
import BaseModal from "components/common/BaseModal";
import { useAppDispatch } from "store/store";
import { hideModal } from "store/slices/modalSlice";
import { createCategory } from "services/CategoryService";
import { keysToCamel } from "utils/functions";
import { CategoryDTO } from "utils/DTO";

export interface AddCateProps {
  onSubmitCategory: (c: Category) => void;
}

export default function AddCategoryModal({ onSubmitCategory }: AddCateProps) {
  const [category, setCategory] = useState<Category>({ name: "" });
  const [serverErr, setServerErr] = useState<string>("");
  const dispatch = useAppDispatch();

  const closeModal = () => {
    dispatch(hideModal());
  };

  const onSubmit = async () => {
    try {
      const { data } = await createCategory(category.name);
      const camelData: Category = keysToCamel(data as CategoryDTO);
      onSubmitCategory(camelData);
      closeModal();
    } catch (error: any) {
      console.log(error);
      setServerErr(error.response.data.error_message);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory({ ...category, name: event.target.value });
  };

  const modalBody = (
    <>
      <Form.Group controlId="name">
        <Form.Label>Category name</Form.Label>
        <Form.Input isInvalid={!!serverErr} type="text" onChange={handleInputChange} value={category.name}></Form.Input>
        <Form.Feedback type="invalid" role="alert" visible={!!serverErr}>
          {serverErr}
        </Form.Feedback>
      </Form.Group>
    </>
  );

  return (
    <BaseModal
      primaryBtnDisabled={!category.name}
      header="Add Category"
      body={modalBody}
      primaryBtn="Add"
      onClickPrimary={onSubmit}
      onClose={closeModal}
      secondaryBtn="Cancel"
    />
  );
}
