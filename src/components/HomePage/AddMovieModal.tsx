import { Button, Modal, Icon, Form } from "@ahaui/react";
import { title } from "process";
import { useState } from "react";
import { Movie } from "utils/Types";

export default function AddMovieModal() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [movie, setMovie] = useState<Movie>({ title: "", description: "" });
  const [invalidFields, setInvalidFields] = useState<string[]>([]);

  const onSubmit = () => {
    if (movie.title && movie.description) {
      setShow(false);
      console.log(invalidFields);
      return;
    }
    if (!movie.title && !invalidFields.includes("title")) {
      setInvalidFields((prev) => [...prev, "title"]);
    }
    if (!movie.description && !invalidFields.includes("description")) {
      setInvalidFields((prev) => [...prev, "description"]);
    }
  };

  const onToggle = () => {
    if (show) {
      setMovie({ title: "", description: "" });
      setInvalidFields([]);
    }
    setShow(!show);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setInvalidFields(invalidFields.filter((field) => field !== id));
    setMovie({ ...movie, [id]: value });
  };

  return (
    <>
      <Button variant="primary" className="u-textTransformNone" onClick={onToggle}>
        <Icon name="plus" role="button" className="u-marginRightTiny" /> Movie
      </Button>
      {show && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Movie</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Movie title</Form.Label>
              <Form.Input
                isInvalid={invalidFields.includes("title")}
                type="text"
                id="title"
                onChange={handleChange}
              ></Form.Input>
              <Form.Feedback type="invalid" visible={invalidFields.includes("title")}>
                Movie title is required
              </Form.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Movie description</Form.Label>
              <Form.Input
                isInvalid={invalidFields.includes("description")}
                as="textarea"
                rows={3}
                id="description"
                onChange={handleChange}
              ></Form.Input>
              <Form.Feedback type="invalid" visible={invalidFields.includes("description")}>
                Movie description is required
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
