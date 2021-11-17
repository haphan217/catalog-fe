import CategoryList from "components/HomePage/CategoryList";
import ItemList from "components/HomePage/ItemList";
import { useEffect, useState } from "react";
import { Category, ListResponse } from "utils/Types";
import { EmptyState, Icon, Button, Loader } from "@ahaui/react";
import { AddCateProps } from "components/HomePage/AddCategoryModal";
import { useAppDispatch } from "store/store";
import { ModalContent, showModal } from "store/slices/modalSlice";
import { ModalKey } from "utils/constants";
import { useSelector } from "react-redux";
import { selectUser } from "store/slices/userSlice";
import { getCategoryList } from "services/CategoryService";
import { ListResponseDTO } from "utils/DTO";
import { keysToCamel } from "utils/functions";

const sampleCategory: Category[] = [
  { name: "Category 1", id: 1 },
  { name: "Category 2", id: 2 },
  { name: "Category 3", id: 3 },
];

export default function HomePage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<number>();
  const [categories, setCategories] = useState<Category[]>([]);
  const dispatch = useAppDispatch();
  const profile = useSelector(selectUser);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await getCategoryList();
        const camelData: ListResponse = keysToCamel(data as ListResponseDTO);
        setCategories(camelData.items);
        setSelectedCategory(camelData.items[0].id || 0);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const onSelectCategory = (category: number) => {
    // console.log(selectedCategory);
    setSelectedCategory(category);
  };

  const onAddCategorySuccess = (category: Category) => {
    setCategories([...categories, category]);
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

  // useEffect(() => {
  //   console.log(selectedCategory);
  // }, [selectedCategory]);

  const onDeleteCategory = (cate: Category) => {
    const filteredCateList = categories.filter((c) => c.id !== cate.id);
    setCategories(filteredCateList);
    // console.log(filteredCateList[0].id);
    setSelectedCategory(filteredCateList[0].id || 1);
  };

  return !loading ? (
    categories[0] && selectedCategory ? (
      <div className="Grid" style={{ margin: 0 }}>
        <CategoryList
          selectedCategory={selectedCategory}
          onSelectCategory={onSelectCategory}
          categories={categories}
          onAddCategory={onAddCategorySuccess}
        />
        <ItemList
          category={categories.find((c) => c.id == selectedCategory) || categories[0]}
          onDeleteCategory={onDeleteCategory}
        />
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
    )
  ) : (
    <div className="u-positionAbsolute u-positionCenter">
      <Loader size="medium" duration={500} />
    </div>
  );
}
