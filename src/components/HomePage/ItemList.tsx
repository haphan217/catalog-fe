import { useEffect, useState } from "react";
import { Dropdown, Icon } from "@ahaui/react";
import { Category, Item } from "utils/Types";
import DeleteModal from "components/common/DeleteModal";
import PaginationCustom from "components/common/CustomPagination";
import AddCategoryModal from "./AddCategoryModal";
import AddItemModal from "./AddItemModal";
import ItemCard from "./ItemCard";

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

  useEffect(() => {
    //getItemByCategoryId here
  }, [currentPage]);

  const onDeleteCategory = () => {
    console.log(category?.name);
  };

  const onAddItem = (item: Item) => {
    console.log(item);
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
                {/* <AddCategoryModal
                  setShowDropdown={setShowDropdown}
                  editingCategory={category}
                  onSubmitCategory={onEditCategory}
                /> */}
              </Dropdown.Item>
              <Dropdown.Item>
                <DeleteModal type="category" item={category} onDelete={onDeleteCategory} />
              </Dropdown.Item>
            </Dropdown.Container>
          </Dropdown>
        </div>
      )}
      <div className="u-marginLeftSmall">
        <AddItemModal onSubmitItem={onAddItem} />
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
