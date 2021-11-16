import { useState } from "react";
import { Button, Modal, Icon, Form } from "@ahaui/react";
import { Category } from "utils/Types";

export interface AddCateProps {
  editingCategory?: Category;
  setShowDropdown?: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmitCategory: (c: Category) => void;
}

export default function AddCategoryModal({ editingCategory, setShowDropdown, onSubmitCategory }: AddCateProps) {
  const [show, setShow] = useState(false);
  const [category, setCategory] = useState<Category>(editingCategory || { name: "" });

  const onToggle = () => {
    if (show) {
      setCategory(editingCategory || { name: "" });
    } else {
      if (setShowDropdown) {
        setTimeout(() => {
          setShowDropdown(false);
        }, 1000);
      }
    }
    setShow(!show);
  };

  const onSubmit = () => {
    onToggle();
    onSubmitCategory(category);
    console.log(category);
    return;
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory({ ...category, name: event.target.value });
  };

  const renderButton = () => {
    if (editingCategory)
      return (
        <span className="u-widthFull" onClick={onToggle} role="button">
          Edit category
        </span>
      );
    else
      return (
        <Button variant="primary" className="u-textTransformNone u-marginLeftSmall" onClick={onToggle}>
          <Icon name="plus" role="button" className="u-marginRightTiny" /> Category
        </Button>
      );
  };

  return (
    <>
      {renderButton()}
      {show && (
        <Modal show={show} onHide={onToggle}>
          <Modal.Header closeButton>
            <Modal.Title>
              <h3 style={{ marginBottom: 0 }}>{editingCategory ? "Edit" : "Add"} Category</h3>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="name">
              <Form.Label>Category name</Form.Label>
              <Form.Input type="text" onChange={handleInputChange} value={category.name}></Form.Input>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onToggle}>
              Cancel
            </Button>
            <Button disabled={!category.name} variant="primary" onClick={onSubmit}>
              {editingCategory ? "Edit" : "Add"}
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}
