import { useState } from "react";
import { Button, Modal, Icon, Form } from "@ahaui/react";
import { Category } from "utils/Types";

interface Props {
  editingCategory?: Category;
  setShowDropdown?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddCategoryModal({ editingCategory, setShowDropdown }: Props) {
  const [show, setShow] = useState(false);
  const [category, setCategory] = useState<Category>({ name: editingCategory ? editingCategory.name : "" });

  const onToggle = () => {
    if (show) {
      setCategory({ name: editingCategory ? editingCategory.name : "" });
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
    console.log(category);
    return;
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory({ ...category, name: event.target.value });
  };

  const renderButton = () => {
    if (editingCategory)
      return (
        <span className="u-widthFull" onClick={onToggle}>
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
            <Modal.Title>{editingCategory ? "Edit" : "Add"} Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Category name</Form.Label>
              <Form.Input type="text" id="name" onChange={handleInputChange} value={category.name}></Form.Input>
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
