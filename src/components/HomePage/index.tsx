import { useEffect, useState } from "react";
import { EmptyState, Icon, Button, Loader } from "@ahaui/react";
import { useSelector } from "react-redux";
import CategoryList from "components/HomePage/CategoryList";
import ItemList from "components/HomePage/ItemList";
import { Category, ListResponse } from "utils/Types";
import { AddCateProps } from "components/HomePage/AddCategoryModal";
import { useAppDispatch } from "store/store";
import { ModalContent, showModal } from "store/slices/modalSlice";
import { ModalKey } from "utils/constants";
import { selectUser } from "store/slices/userSlice";
import { getCategoryList } from "services/CategoryService";
import { ListResponseDTO } from "utils/DTO";
import { keysToCamel } from "utils/functions";
import { notifyPositive } from "components/layout/ToastSuccess";

export default function HomePage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<number>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const dispatch = useAppDispatch();
  const profile = useSelector(selectUser);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data } = await getCategoryList(page);
      const camelData: ListResponse = keysToCamel(data as ListResponseDTO);
      setCategories((prevList) => {
        return [...prevList, ...camelData.items];
      });
      page === 1 && camelData.items[0] && setSelectedCategory(camelData.items[0].id);
      setTotal(camelData.totalItems);
      setLoading(false);
    })();
  }, [page]);

  const onAddCategorySuccess = (category: Category) => {
    notifyPositive(`Category ${category.name} successfully added`);
    setTotal(total + 1);
    setCategories([...categories, category]);
    setSelectedCategory(category.id);
  };

  const showAddCategoryModal = () => {
    const props: AddCateProps = {
      onSubmitCategory: onAddCategorySuccess,
    };
    const content: ModalContent = {
      modalName: ModalKey.ADD_CATEGORY,
      modalProps: props,
    };
    dispatch(showModal(content));
  };

  const onDeleteCategory = (cate: Category) => {
    notifyPositive(`Category ${cate.name} successfully deleted`);
    setTotal(total - 1);
    const filteredCateList = categories.filter((c) => c.id !== cate.id);
    setCategories(filteredCateList);
    filteredCateList[0] && setSelectedCategory(filteredCateList[0].id);
  };

  return categories[0] && selectedCategory ? (
    <div className="Grid" style={{ margin: 0 }}>
      <CategoryList
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        categories={categories}
        onAddCategory={onAddCategorySuccess}
        totalCategories={total}
        onScrollToEnd={() => setPage((prev) => prev + 1)}
      />
      <ItemList
        category={categories.find((c) => c.id == selectedCategory) || categories[0]}
        onDeleteCategory={onDeleteCategory}
      />
    </div>
  ) : loading ? (
    <div className="u-positionAbsolute u-positionCenter">
      <Loader data-testid="loader" size="medium" duration={500} />
    </div>
  ) : (
    <div className="u-positionAbsolute u-positionCenter">
      <EmptyState src="https://raw.githubusercontent.com/gotitinc/aha-assets/master/gotit/emptyState/general.svg">
        <EmptyState.Description>Nothing to show :&#40;</EmptyState.Description>
        {profile.isAuthenticated ? (
          <Button variant="primary" className="u-textTransformNone" onClick={showAddCategoryModal}>
            <Icon name="plus" role="button" className="u-marginRightTiny" /> Category
          </Button>
        ) : (
          <EmptyState.Description>Please login to add contents</EmptyState.Description>
        )}
      </EmptyState>
    </div>
  );
}
