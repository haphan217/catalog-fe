import React, { useState, useEffect } from "react";
import { AddCateProps } from "components/HomePage/AddCategoryModal";
import { Category } from "utils/Types";
import { Icon, Button, Loader } from "@ahaui/react";
import { useAppDispatch } from "store/store";
import { ModalContent, showModal } from "store/slices/modalSlice";
import { ModalKey } from "utils/constants";
import { useSelector } from "react-redux";
import { selectUser } from "store/slices/userSlice";
import InfiniteScroll from "react-infinite-scroll-component";

interface Props {
  selectedCategory: number;
  onSelectCategory: (categoryId: number) => void;
  categories: Category[];
  onAddCategory: (c: Category) => void;
  totalCategories: number;
  onScrollToEnd: () => void;
}

const CategoryList = React.memo(function CategoryList({
  onSelectCategory,
  selectedCategory,
  categories,
  onAddCategory,
  totalCategories,
  onScrollToEnd,
}: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState(true);

  // Hide toggle button when page is scorlled upto given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 5) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  };
  // useEffect(() => {
  //   window.addEventListener("scroll", toggleVisibility);
  // }, []);

  const dispatch = useAppDispatch();
  const profile = useSelector(selectUser);

  const showAddCategoryModal = () => {
    const props: AddCateProps = {
      onSubmitCategory: onAddCategory,
    };
    const content: ModalContent = {
      modalName: ModalKey.ADD_CATEGORY,
      modalProps: props,
    };
    dispatch(showModal(content));
  };

  return (
    <div className={`sidenav ${isOpen ? "Show " : ""} md:u-size2of10`} id="scrollableDiv">
      {isVisible && (
        <div className="toggler md:u-hidden">
          <Icon size="medium" name="menu" role="button" onClick={() => setIsOpen(true)} />
        </div>
      )}
      <div className="u-flex u-justifyContentBetween">
        {profile.isAuthenticated && (
          <Button variant="primary" className="u-textTransformNone u-marginLeftSmall" onClick={showAddCategoryModal}>
            <Icon name="plus" role="button" className="u-marginRightTiny" /> Category
          </Button>
        )}
        <Icon
          size="medium"
          name="close"
          className="u-block md:u-hidden u-marginHorizontalSmall"
          onClick={() => setIsOpen(false)}
        />
      </div>
      <div className="u-marginTopSmall u-positionRelative">
        <InfiniteScroll
          dataLength={categories.length}
          next={onScrollToEnd}
          hasMore={categories.length < totalCategories}
          loader={
            <div className="u-textCenter">
              <Loader />
            </div>
          }
          endMessage={
            <p className="u-textCenter">
              <small className="u-textLight">{`${totalCategories} ${
                totalCategories > 1 ? "categories" : "category"
              }`}</small>
            </p>
          }
          scrollableTarget="scrollableDiv"
        >
          {categories.map((c) => (
            <div
              role="button"
              key={c.id}
              onClick={() => {
                onSelectCategory(c.id);
                setIsOpen(false);
              }}
              className={`menu-item ${
                selectedCategory === c.id ? "is-active u-backgroundLightest" : ""
              } u-paddingExtraSmall hover:u-backgroundLightest`}
            >
              <span className="truncate">{c.name}</span>
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
});
export default CategoryList;
