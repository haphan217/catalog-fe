import { useEffect, useState } from "react";
import { Dropdown, Icon, Button } from "@ahaui/react";
import { Category, Item } from "utils/Types";
import DeleteModal, { DeleteModalProps } from "components/common/DeleteModal";
import PaginationCustom from "components/common/CustomPagination";
import AddCategoryModal from "./AddCategoryModal";
import AddItemModal, { AddItemProps } from "./AddItemModal";
import ItemCard from "./ItemCard";
import { useAppDispatch } from "store/store";
import { showModal, ModalContent } from "store/slices/modalSlice";
import { ModalKey } from "utils/constants";
interface Props {
  category: Category;
}

export default function ItemList({ category }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(10);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [itemList, setItemList] = useState<Item[]>([]);

  const sampleItem: Item = {
    name: "awesome item",
    description: "awesome description",
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    //getItemByCategoryId here
  }, [currentPage]);

  const onDeleteCategory = () => {
    console.log(category?.name);
  };

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
          <Dropdown show={showDropdown} alignRight onToggle={() => setShowDropdown(!showDropdown)}>
            <Dropdown.Toggle className="u-textLight u-lineHeightNone">
              <Icon name="more" size="medium" />
            </Dropdown.Toggle>
            <Dropdown.Container className="u-paddingVerticalExtraSmall">
              <Dropdown.Item>
                {/* <DeleteModal type="category" item={category} onDelete={onDeleteCategory} /> */}
                <span className="u-widthFull" role="button" onClick={showDeleteCategoryModal}>
                  Delete category
                </span>
              </Dropdown.Item>
            </Dropdown.Container>
          </Dropdown>
        </div>
      )}
      <div className="u-marginLeftSmall">
        <Button onClick={showAddItemModal}>
          <Icon name="plus" role="button" className="u-marginRightTiny" />
          Item
        </Button>
      </div>
      <div className="u-flex u-flexWrap u-marginTopSmall">
        {[1, 2, 3, 4].map((item) => (
          <ItemCard key={item} item={sampleItem} />
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
  );
}
