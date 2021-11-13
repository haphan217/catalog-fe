import { useEffect, useState } from "react";
import { Dropdown, Icon } from "@ahaui/react";
import { Category, Item } from "utils/Types";
import DeleteModal from "components/common/DeleteModal";
import PaginationCustom from "components/common/CustomPagination";
import AddCategoryModal from "./AddCategoryModal";
import AddItemModal from "./AddItemModal";
import ItemCard from "./ItemCard";

interface Props {
  categoryId: number;
}

export default function ItemList({ categoryId }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(10);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [category, setCategory] = useState<Category>();
  const [itemList, setItemList] = useState<Item[]>([]);

  useEffect(() => {
    //getItemByCategoryId here
    setCategory({ name: "comedy" });
  }, [currentPage]);

  const onDeleteCategory = () => {
    console.log(category?.name);
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
                <AddCategoryModal setShowDropdown={setShowDropdown} editingCategory={category} />
              </Dropdown.Item>
              <Dropdown.Item>
                <DeleteModal type="category" item={category} onDelete={onDeleteCategory} />
              </Dropdown.Item>
            </Dropdown.Container>
          </Dropdown>
        </div>
      )}
      <div className="u-marginLeftSmall">
        <AddItemModal categoryId={categoryId} />
      </div>
      <div className="u-flex u-flexWrap u-marginTopSmall">
        {[1, 2, 3, 4].map((item) => (
          <ItemCard key={item} itemId={item} />
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
