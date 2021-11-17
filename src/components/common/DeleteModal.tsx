import { Category, Item } from "utils/Types";
import BaseModal from "./BaseModal";
import { useAppDispatch } from "store/store";
import { hideModal } from "store/slices/modalSlice";
import { useState } from "react";
import { deleteCategory } from "services/CategoryService";
import { deleteItem } from "services/ItemService";
export interface DeleteModalProps {
  item: Category | Item;
  type: string;
  onDelete: (item: Category | Item) => void;
}

export default function DeleteModal({ item, onDelete, type }: DeleteModalProps) {
  const [serverErr, setServerErr] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const closeModal = () => {
    dispatch(hideModal());
  };

  const onDeleteItem = async () => {
    try {
      setLoading(true);
      if (type === "Item") {
        await deleteItem((item as Item).categoryId, item.id);
      } else {
        await deleteCategory(item.id);
      }
      onDelete(item);
      closeModal();
    } catch (error: any) {
      setServerErr(error.message);
    } finally {
      setLoading(false);
    }
  };

  const modalBody = (
    <>
      <p>
        Are you sure you want to delete <b>{item.name}</b>?
      </p>
      {serverErr && <p className="u-textAccent">{serverErr}</p>}
    </>
  );

  return (
    <BaseModal
      header={`Delete ${type}`}
      body={modalBody}
      primaryBtn="Delete"
      primaryBtnVariant="accent"
      primaryBtnDisabled={false}
      onClickPrimary={onDeleteItem}
      onClose={closeModal}
      secondaryBtn="Cancel"
      loading={loading}
    />
  );
}
