import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store/rootReducer";

export type ModalContent = {
  modalName: string;
  modalProps: any;
};

export type ModalSliceState = {
  isOpen: boolean;
  modalContent: ModalContent | null;
};
const initialState: ModalSliceState = { isOpen: false, modalContent: null };

const modaleSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal(state, action: PayloadAction<ModalContent>) {
      return { isOpen: true, modalContent: action.payload };
    },
    hideModal() {
      return { isOpen: false, modalContent: null };
    },
  },
});

export const { showModal, hideModal } = modaleSlice.actions;
export const selectModal = (state: RootState) => state.modalReducer;
export default modaleSlice.reducer;
