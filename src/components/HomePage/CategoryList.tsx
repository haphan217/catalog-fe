import { useState, useEffect, useRef, useCallback } from "react";
import { SidebarMenu } from "@ahaui/react";
import { AddCateProps } from "components/HomePage/AddCategoryModal";
import { Category } from "utils/Types";
import { Icon, Button } from "@ahaui/react";
import { useAppDispatch } from "store/store";
import { ModalContent, showModal } from "store/slices/modalSlice";
import { ModalKey } from "utils/constants";
import { useSelector } from "react-redux";
import { selectUser } from "store/slices/userSlice";

interface Props {
  selectedCategory: number;
  onSelectCategory: (categoryId: number) => void;
  categories: Category[];
  onAddCategory: (c: Category) => void;
  loading: boolean;
  totalCategories: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function CategoryList({
  onSelectCategory,
  selectedCategory,
  categories,
  onAddCategory,
  loading,
  totalCategories,
  setPage,
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
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
  }, []);

  // const observer = useRef<any>();
  // const lastCategoryRef = useCallback((lastCategory) => {
  //   // if (loading) return;
  //   if (observer.current) observer.current.disconnect();
  //   observer.current = new IntersectionObserver((entries) => {
  //     if (entries[0].isIntersecting && categories.length < totalCategories) {
  //       console.log("into view");
  //       setPage((prevPage) => prevPage + 1);
  //     }
  //   });
  //   if (lastCategory) observer.current.observe(lastCategory);
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
    <div className={`sidenav ${isOpen ? "Show " : ""} md:u-size2of10`}>
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
      <SidebarMenu
        size="small"
        current={selectedCategory}
        onSelect={(id: number) => {
          onSelectCategory(id);
          setIsOpen(false);
        }}
      >
        {categories.map((c, i) => (
          <SidebarMenu.Item key={c.id} eventKey={c.id}>
            <span className="truncate">{c.name}</span>
          </SidebarMenu.Item>
        ))}
      </SidebarMenu>
    </div>
  );
}
