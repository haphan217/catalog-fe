import { useState } from "react";
import { Modal, Button } from "@ahaui/react";
import { Category, Item } from "utils/Types";
import BaseModal from "./BaseModal";
import { useAppDispatch } from "store/store";
import { hideModal } from "store/slices/modalSlice";
export interface DeleteModalProps {
  item: Category | Item;
  type: string;
  onDelete: (item: Category | Item) => void;
}

export default function DeleteModal({ item, onDelete, type }: DeleteModalProps) {
  const dispatch = useAppDispatch();

  const closeModal = () => {
    dispatch(hideModal());
  };

  const deleteItem = () => {
    onDelete(item);
    closeModal();
  };
  return (
    <BaseModal
      header={`Delete ${type}`}
      body={
        <p>
          Are you sure you want to delete <b>{item.name}</b>?
        </p>
      }
      primaryBtn="Delete"
      primaryBtnVariant="accent"
      primaryBtnDisabled={false}
      onClickPrimary={deleteItem}
      onClose={closeModal}
      secondaryBtn="Cancel"
    />
  );
}
