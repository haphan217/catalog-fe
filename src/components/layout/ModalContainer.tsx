import DeleteModal from "components/HomePage/DeleteModal";
import AddCategoryModal from "components/HomePage/AddCategoryModal";
import AddItemModal from "components/HomePage/AddItemModal";
import { useSelector } from "react-redux";
import { selectModal } from "store/slices/modalSlice";
import { ModalKey } from "utils/constants";

export default function ModalContainer() {
  const modalMaps = {
    [ModalKey.ADD_ITEM]: AddItemModal,
    [ModalKey.ADD_CATEGORY]: AddCategoryModal,
    [ModalKey.DELETE_ITEM]: DeleteModal,
  };
  const { modalContent } = useSelector(selectModal);
  const RenderModal = modalContent && modalMaps[modalContent.modalName];
  return RenderModal ? <RenderModal {...modalContent.modalProps} /> : null;
}
