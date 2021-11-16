import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store/rootReducer";

export type ModalContent = {
  modalName: string;
  modalProps: any;
};

export type ModalSliceState = {
  modalContent: ModalContent | null;
};
const initialState: ModalSliceState = { modalContent: null };

const modaleSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal(state, action: PayloadAction<ModalContent>) {
      return { modalContent: action.payload };
    },
    hideModal() {
      return { modalContent: null };
    },
  },
});

export const { showModal, hideModal } = modaleSlice.actions;
export const selectModal = (state: RootState) => state.modalReducer;
export default modaleSlice.reducer;
