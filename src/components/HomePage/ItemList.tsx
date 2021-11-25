import { useEffect, useMemo, useState } from "react";
import { Dropdown, Icon, Button, EmptyState, Loader } from "@ahaui/react";
import { useSelector } from "react-redux";
import { Category, Item, ListResponse } from "utils/Types";
import { DeleteModalProps } from "components/HomePage/DeleteModal";
import CustomPagination from "components/common/CustomPagination";
import { AddItemProps } from "./AddItemModal";
import ItemCard from "./ItemCard";
import { useAppDispatch } from "store/store";
import { showModal, ModalContent } from "store/slices/modalSlice";
import { ModalKey } from "utils/constants";
import { selectUser } from "store/slices/userSlice";
import { getItemList } from "services/ItemService";
import { keysToCamel } from "utils/functions";
import { ListResponseDTO } from "utils/DTO";
import { notifyPositive } from "components/layout/ToastSuccess";

interface Props {
  category: Category;
  onDeleteCategory: (cat: Category) => void;
}

export default function ItemList({ category, onDeleteCategory }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [itemList, setItemList] = useState<Item[]>([]);
  const profile = useSelector(selectUser);
  const dispatch = useAppDispatch();

  const fetchItems = async () => {
    setIsLoading(true);
    const { data } = await getItemList(category.id, currentPage);
    const camelData: ListResponse = keysToCamel(data as ListResponseDTO);
    setItemList(camelData.items as Item[]);
    setTotalItems(camelData.totalItems);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, [currentPage, category]);

  const onAddItem = (item: Item) => {
    notifyPositive(`Item ${item.name} successfully added`);
    if (itemList.length < 20) {
      setTotalItems((prev) => prev + 1);
      setItemList([...itemList, item]);
    } else {
      //fetch item list after adding new item
      if (currentPage === 1) {
        fetchItems();
      } else setCurrentPage(1);
    }
  };

  const onDeleteItem = (item: Item | Category) => {
    notifyPositive(`Item ${item.name} successfully deleted`);
    if (totalItems - 1 <= currentPage * 20) {
      fetchItems();
      return;
    }
    setTotalItems((prev) => prev - 1);
    const filteredItemList = itemList.filter((i) => i.id !== item.id);
    if (filteredItemList[0] || currentPage === 1) {
      setItemList(filteredItemList);
    } else {
      setCurrentPage(1);
    }
  };

  const showAddItemModal = () => {
    const props: AddItemProps = {
      categoryId: category.id,
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

  const totalPage = useMemo(() => {
    return Math.ceil(totalItems / 20);
  }, [totalItems]);

  return (
    <div className="u-sizeFull md:u-size8of10">
      {category && (
        <div className="u-flex u-justifyContentBetween u-marginRightMedium">
          <h3 className="u-marginLeftSmall">{category.name} items</h3>
          {profile.isAuthenticated && category.authorId === profile.user.id && (
            <Dropdown alignRight>
              <Dropdown.Toggle data-testid="dropdown" className="u-textLight u-lineHeightNone">
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
      {isLoading ? (
        <div className="u-positionAbsolute u-positionLeft60 u-positionTop50">
          <Loader size="medium" duration={500} data-testid="loader" />
        </div>
      ) : itemList[0] ? (
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
              <ItemCard key={item.id} initItem={item} onDeleteItem={onDeleteItem} />
            ))}
          </div>
          {totalPage > 1 && (
            <CustomPagination currentPage={currentPage} onPageChange={setCurrentPage} totalPage={totalPage} />
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
