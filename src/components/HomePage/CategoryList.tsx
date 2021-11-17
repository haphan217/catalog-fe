import { useState } from "react";
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
}

export default function CategoryList({ onSelectCategory, selectedCategory, categories, onAddCategory }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
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
      <div className="toggler md:u-hidden">
        <Icon size="medium" name="menu" role="button" onClick={() => setIsOpen(true)} />
      </div>
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
        {categories.map((c) => (
          <SidebarMenu.Item key={c.id} eventKey={c.id}>
            {c.name}
          </SidebarMenu.Item>
        ))}
      </SidebarMenu>
    </div>
  );
}
