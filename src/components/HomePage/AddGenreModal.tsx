import { Button, Modal, Icon, Form } from "@ahaui/react";
import { useState } from "react";
import { Genre } from "utils/Types";

export default function AddGenreModal() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [genre, setGenre] = useState<Genre>({ title: "" });
  const [invalidFields, setInvalidFields] = useState<string[]>([]);

  const onSubmit = () => {
    if (genre.title) {
      setShow(false);
      setGenre({ title: "" });
      console.log(genre);
      return;
    }
    if (!genre.title && !invalidFields.includes("title")) {
      setInvalidFields((prev) => [...prev, "title"]);
    }
  };

  const onToggle = () => {
    if (show) {
      setGenre({ title: "" });
      setInvalidFields([]);
    }
    setShow(!show);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setInvalidFields(invalidFields.filter((field) => field !== id));
    setGenre({ ...genre, [id]: value });
  };

  return (
    <>
      <Button variant="primary" className="u-textTransformNone u-marginLeftSmall" onClick={onToggle}>
        <Icon name="plus" role="button" className="u-marginRightTiny" /> Genre
      </Button>
      {show && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Genre</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Genre title</Form.Label>
              <Form.Input
                isInvalid={invalidFields.includes("title")}
                type="text"
                id="title"
                onChange={handleChange}
              ></Form.Input>
              <Form.Feedback type="invalid" visible={invalidFields.includes("title")}>
                Genre title is required
              </Form.Feedback>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onToggle}>
              Cancel
            </Button>
            <Button variant="primary" onClick={onSubmit}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}
