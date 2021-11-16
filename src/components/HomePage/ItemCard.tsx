import { Card, Dropdown, Icon } from "@ahaui/react";
import { Item } from "utils/Types";
import { useAppDispatch } from "store/store";
import { AddItemProps } from "./AddItemModal";
import { showModal, ModalContent } from "store/slices/modalSlice";
import { ModalKey } from "utils/constants";
import { DeleteModalProps } from "components/common/DeleteModal";
import { useSelector } from "react-redux";
import { selectUser } from "store/slices/userSlice";

export default function ItemCard({ item }: { item: Item }) {
  const dispatch = useAppDispatch();
  const profile = useSelector(selectUser);

  const onDeleteItem = () => {
    console.log(item?.name);
  };

  const onEditItem = (editingItem: Item) => {
    console.log(editingItem);
  };

  const showEditItemModal = () => {
    const props: AddItemProps = {
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
          {profile.isAuthenticated && (
            <Dropdown alignRight>
              <Dropdown.Toggle className="u-textLight u-lineHeightNone">
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
