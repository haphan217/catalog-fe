import reducer, { showModal, ModalContent, hideModal } from "store/slices/modalSlice";
import { ModalKey } from "utils/constants";

const sampleModal: ModalContent = {
  modalName: ModalKey.ADD_CATEGORY,
  modalProps: {},
};

describe("test modal slice", () => {
  test("state changes when open modal", () => {
    expect(reducer(undefined, showModal(sampleModal)).modalContent).not.toBeNull();
  });

  test("state changes when close modal", () => {
    expect(reducer({ modalContent: sampleModal }, hideModal).modalContent).toBeNull();
  });
});
