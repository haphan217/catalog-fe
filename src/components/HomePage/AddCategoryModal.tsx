import { useEffect, useState } from "react";
import { Button, Modal, Icon, Form } from "@ahaui/react";
import { Category } from "utils/Types";

interface Props {
  editingCategory?: Category;
}

export default function AddCategoryModal({ editingCategory }: Props) {
  const [show, setShow] = useState(false);
  const [category, setCategory] = useState<Category>({ name: editingCategory ? editingCategory.name : "" });
  const [invalidFields, setInvalidFields] = useState<string[]>([]);

  const onToggle = () => {
    if (show) {
      setCategory({ name: editingCategory ? editingCategory.name : "" });
      setInvalidFields([]);
    }
    setShow(!show);
  };

  const onSubmit = () => {
    if (category.name) {
      onToggle();
      console.log(category);
      return;
    }
    if (!category.name && !invalidFields.includes("name")) {
      setInvalidFields((prev) => [...prev, "name"]);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setInvalidFields(invalidFields.filter((field) => field !== id));
    setCategory({ ...category, [id]: value });
  };

  const renderButton = () => {
    if (editingCategory) return <span onClick={onToggle}>Edit category</span>;
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
              <Form.Input
                isInvalid={invalidFields.includes("name")}
                type="text"
                id="name"
                onChange={handleChange}
                value={category.name}
              ></Form.Input>
              <Form.Feedback type="invalid" visible={invalidFields.includes("name")}>
                Category name is required
              </Form.Feedback>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onToggle}>
              Cancel
            </Button>
            <Button variant="primary" onClick={onSubmit}>
              {editingCategory ? "Edit" : "Add"}
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}
