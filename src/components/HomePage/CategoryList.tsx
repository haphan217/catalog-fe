import { useEffect, useState } from "react";
import { SidebarMenu } from "@ahaui/react";
import AddCategoryModal from "components/HomePage/AddCategoryModal";
import { Category } from "utils/Types";
import { Icon } from "@ahaui/react";
interface Props {
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
  categories: Category[];
}

export default function CategoryList({ onSelectCategory, selectedCategory, categories }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onAddCategory = (c: Category) => {
    console.log(c);
  };

  return (
    <div className={`sidenav ${isOpen ? "Show " : ""} md:u-size2of10`}>
      <div className="toggler md:u-hidden">
        <Icon size="medium" name="menu" role="button" onClick={() => setIsOpen(true)} />
      </div>
      <div className="u-flex u-justifyContentBetween">
        <AddCategoryModal onSubmitCategory={onAddCategory} />
        <Icon
          size="medium"
          name="close"
          className="u-block md:u-hidden u-marginRightSmall"
          onClick={() => setIsOpen(false)}
        />
      </div>
      <SidebarMenu
        size="small"
        current={selectedCategory.id}
        onSelect={(id: number) => onSelectCategory(categories.find((c) => c.id == id) || categories[0])}
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
