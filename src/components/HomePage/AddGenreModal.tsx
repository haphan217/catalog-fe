import { Button, Modal, Icon } from "@ahaui/react";
import { useState } from "react";

export default function AddGenreModal() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  return (
    <>
      <Button variant="primary" className="u-textTransformNone u-marginLeftSmall" onClick={() => setShow(true)}>
        <Icon name="plus" role="button" className="u-marginRightTiny" /> Genre
      </Button>
      {show && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Genre</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="u-textCenter">
              <img src="holder.js/100px160?text=Image" className="u-maxWidthFull u-marginBottomExtraSmall" alt="" />
            </div>
            <p>Modal body text goes here.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setShow(false)}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}
