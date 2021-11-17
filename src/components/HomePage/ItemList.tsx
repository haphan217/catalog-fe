import { useEffect, useState } from "react";
import { Dropdown, Icon, Button, EmptyState } from "@ahaui/react";
import { Category, Item } from "utils/Types";
import { DeleteModalProps } from "components/common/DeleteModal";
import PaginationCustom from "components/common/CustomPagination";
import { AddItemProps } from "./AddItemModal";
import ItemCard from "./ItemCard";
import { useAppDispatch } from "store/store";
import { showModal, ModalContent } from "store/slices/modalSlice";
import { ModalKey } from "utils/constants";
import { useSelector } from "react-redux";
import { selectUser } from "store/slices/userSlice";

interface Props {
  category: Category;
  onDeleteCategory: (cat: Category) => void;
}

export default function ItemList({ category, onDeleteCategory }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(10);
  const [itemList, setItemList] = useState<Item[]>([]);
  const profile = useSelector(selectUser);

  const sampleItem: Item = {
    name: "awesome item",
    description: "awesome description",
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    //getItemByCategoryId here
  }, [currentPage]);

  const onAddItem = (item: Item) => {
    console.log(item);
  };

  const showAddItemModal = () => {
    const props: AddItemProps = {
      onSubmitItem: onAddItem,
    };
    const content: ModalContent = {
      modalName: ModalKey.ADD_ITEM,
      modalProps: props,
    };
    dispatch(showModal(content));
  };

  const showDeleteCategoryModal = () => {
    const props: DeleteModalProps = {
      item: category,
      onDelete: onDeleteCategory,
      type: "Category",
    };
    const content: ModalContent = {
      modalName: ModalKey.DELETE_ITEM,
      modalProps: props,
    };
    dispatch(showModal(content));
  };

  return (
    <div className="u-sizeFull md:u-size8of10">
      {category && (
        <div className="u-flex u-justifyContentBetween u-marginRightMedium">
          <h3 className="u-marginLeftSmall">{category.name} items</h3>
          {profile.isAuthenticated && (
            <Dropdown alignRight>
              <Dropdown.Toggle className="u-textLight u-lineHeightNone">
                <Icon name="more" size="medium" />
              </Dropdown.Toggle>
              <Dropdown.Container className="u-paddingVerticalExtraSmall">
                <Dropdown.Item>
                  <span className="u-widthFull" role="button" onClick={showDeleteCategoryModal}>
                    Delete category
                  </span>
                </Dropdown.Item>
              </Dropdown.Container>
            </Dropdown>
          )}
        </div>
      )}
      {itemList[0] ? (
        <div>
          <div className="u-marginLeftSmall">
            {profile.isAuthenticated && (
              <Button onClick={showAddItemModal}>
                <Icon name="plus" role="button" className="u-marginRightTiny" />
                Item
              </Button>
            )}
          </div>
          <div className="u-flex u-flexWrap u-marginTopSmall">
            {itemList.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
          {totalPage > 1 && (
            <PaginationCustom
              currentPage={currentPage}
              onPageChange={(page) => setCurrentPage(page)}
              totalPage={totalPage}
            />
          )}
        </div>
      ) : (
        <div className="u-positionAbsolute u-positionLeft20 u-positionLeft50" style={{ top: "25%" }}>
          <EmptyState src="https://raw.githubusercontent.com/gotitinc/aha-assets/master/gotit/emptyState/general.svg">
            <EmptyState.Description>Nothing to show :&#40;</EmptyState.Description>
            {profile.isAuthenticated ? (
              <Button onClick={showAddItemModal}>
                <Icon name="plus" role="button" className="u-marginRightTiny" />
                Item
              </Button>
            ) : (
              <EmptyState.Description>Please login to add items</EmptyState.Description>
            )}
          </EmptyState>
        </div>
      )}
    </div>
  );
}
