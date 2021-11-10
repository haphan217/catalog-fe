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

  const [category, setCategory] = useState<Category>();
  const [itemList, setItemList] = useState<Item[]>([]);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    console.log(page);
  };

  useEffect(() => {
    //getItemByCategoryId, getCategoryDetails here
    setCategory({ name: "comedy" });
  }, []);

  const onDelete = () => {
    console.log(category?.name);
  };

  return (
    <div className="u-sizeFull md:u-size8of10">
      {category && (
        <div className="u-flex u-justifyContentBetween u-marginRightMedium">
          <h3 className="u-marginLeftSmall">{category.name} items</h3>
          <Dropdown alignRight>
            <Dropdown.Toggle className="u-textLight u-lineHeightNone">
              <Icon name="more" size="medium" />
            </Dropdown.Toggle>
            <Dropdown.Container className="u-paddingVerticalExtraSmall">
              <Dropdown.Item>
                <AddCategoryModal editingCategory={category} />
              </Dropdown.Item>
              <Dropdown.Item>
                <DeleteModal type="category" item={category} onDelete={onDelete} />
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
        <PaginationCustom currentPage={currentPage} onPageChange={onPageChange} totalPage={totalPage} />
      )}
    </div>
  );
}
