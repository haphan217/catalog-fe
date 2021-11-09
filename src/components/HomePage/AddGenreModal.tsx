import { useState } from "react";
import { Button, Modal, Icon, Form } from "@ahaui/react";
import { Genre } from "utils/Types";

interface Props {
  editingGenre?: Genre;
}

export default function AddGenreModal({ editingGenre }: Props) {
  const [show, setShow] = useState(false);
  const [genre, setGenre] = useState<Genre>({ title: editingGenre?.title || "" });
  const [invalidFields, setInvalidFields] = useState<string[]>([]);

  const onToggle = () => {
    if (show) {
      setGenre({ title: editingGenre?.title || "" });
      setInvalidFields([]);
    }
    setShow(!show);
  };

  const onSubmit = () => {
    if (genre.title) {
      onToggle();
      console.log(genre);
      return;
    }
    if (!genre.title && !invalidFields.includes("title")) {
      setInvalidFields((prev) => [...prev, "title"]);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setInvalidFields(invalidFields.filter((field) => field !== id));
    setGenre({ ...genre, [id]: value });
  };

  const renderButton = () => {
    if (editingGenre) return <span onClick={onToggle}>Edit genre</span>;
    else
      return (
        <Button variant="primary" className="u-textTransformNone u-marginLeftSmall" onClick={onToggle}>
          <Icon name="plus" role="button" className="u-marginRightTiny" /> Genre
        </Button>
      );
  };

  return (
    <>
      {renderButton()}
      {show && (
        <Modal show={show} onHide={onToggle}>
          <Modal.Header closeButton>
            <Modal.Title>{editingGenre ? "Edit" : "Add"} Genre</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Genre title</Form.Label>
              <Form.Input
                isInvalid={invalidFields.includes("title")}
                type="text"
                id="title"
                onChange={handleChange}
                value={genre.title}
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
              {editingGenre ? "Edit" : "Add"}
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}
