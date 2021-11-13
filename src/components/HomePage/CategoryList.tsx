import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { SidebarMenu } from "@ahaui/react";
import AddCategoryModal from "components/HomePage/AddCategoryModal";
import { Category } from "utils/Types";
interface Props {
  isOpen: boolean;
  categoryList: Category[];
}

export default function CategoryList({ isOpen, categoryList }: Props) {
  const history = useHistory();
  const [selectedCategory, setSelectedCategory] = useState<string>(history.location.pathname.split("/")[2]);

  const onSelectCategory = (id: string) => {
    setSelectedCategory(id);
    history.push(id);
  };

  const onAddCategory = (c: Category) => {
    console.log(c);
  };

  useEffect(() => {
    setSelectedCategory(history.location.pathname.split("/")[2]);
  }, [history.location.pathname]);

  return (
    <div className={`Collapse ${isOpen ? "Show " : ""}sidenav u-sizeFull md:u-size2of10`}>
      <AddCategoryModal onSubmitCategory={onAddCategory} />
      <SidebarMenu size="small" current={selectedCategory} onSelect={onSelectCategory}>
        {[1, 2, 3, 4, 5].map((i) => (
          <SidebarMenu.Item key={i} eventKey={i}>
            Category {i}
          </SidebarMenu.Item>
        ))}
      </SidebarMenu>
    </div>
  );
}
