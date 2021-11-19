import { Card, Dropdown, Icon } from "@ahaui/react";
import { Item, Category } from "utils/Types";
import { useAppDispatch } from "store/store";
import { AddItemProps } from "./AddItemModal";
import { showModal, ModalContent } from "store/slices/modalSlice";
import { ModalKey } from "utils/constants";
import { DeleteModalProps } from "components/HomePage/DeleteModal";
import { useSelector } from "react-redux";
import { selectUser } from "store/slices/userSlice";
import { useState } from "react";
import { notifyPositive } from "components/layout/ToastSuccess";

interface CardProps {
  initItem: Item;
  onDeleteItem: (i: Item | Category) => void;
}

export default function ItemCard({ initItem, onDeleteItem }: CardProps) {
  const dispatch = useAppDispatch();
  const profile = useSelector(selectUser);
  const [item, setItem] = useState<Item>(initItem);

  const onEditItem = (editingItem: Item) => {
    notifyPositive(`Item ${editingItem.name} succesfully updated`);
    setItem(editingItem);
  };

  const showEditItemModal = () => {
    const props: AddItemProps = {
      categoryId: item.categoryId,
      onSubmitItem: onEditItem,
      editingItem: item,
    };
    const content: ModalContent = {
      modalName: ModalKey.ADD_ITEM,
      modalProps: props,
    };
    dispatch(showModal(content));
  };

  const showDeleteItemModal = () => {
    const props: DeleteModalProps = {
      item: item,
      onDelete: onDeleteItem,
      type: "Item",
    };
    const content: ModalContent = {
      modalName: ModalKey.DELETE_ITEM,
      modalProps: props,
    };
    dispatch(showModal(content));
  };

  return (
    <Card style={{ width: 300 }} size="medium" className="u-marginHorizontalSmall u-shadowSmall">
      <Card.Body>
        <div className="u-flex u-justifyContentBetween">
          <div>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
          </div>
          {profile.isAuthenticated && profile.user.id === item.authorId && (
            <Dropdown alignRight>
              <Dropdown.Toggle data-testid="dropdown-card" className="u-textLight u-lineHeightNone">
                <Icon name="more" size="small" />
              </Dropdown.Toggle>
              <Dropdown.Container className="u-paddingVerticalExtraSmall">
                <Dropdown.Item>
                  <span className="u-widthFull" role="button" onClick={showEditItemModal}>
                    Edit Item
                  </span>
                </Dropdown.Item>
                <Dropdown.Item>
                  <span className="u-widthFull" role="button" onClick={showDeleteItemModal}>
                    Delete Item
                  </span>
                </Dropdown.Item>
              </Dropdown.Container>
            </Dropdown>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
