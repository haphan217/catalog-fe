import { Route, Switch, useRouteMatch, useLocation, useHistory } from "react-router-dom";
import { PageLayout } from "@ahaui/react";
import CategoryList from "components/HomePage/CategoryList";
import ItemList from "components/HomePage/ItemList";
import { useEffect, useState } from "react";
import { Category } from "utils/Types";

const sampleCategory: Category[] = [
  { name: "Category 1", id: 1 },
  { name: "Category 2", id: 2 },
  { name: "Category 3", id: 3 },
];

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>({ name: "" });
  const [categories, setCategories] = useState<Category[]>(sampleCategory);

  const onSelectCategory = (category: Category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="Grid" style={{ margin: 0 }}>
      <CategoryList selectedCategory={selectedCategory} onSelectCategory={onSelectCategory} categories={categories} />
      <ItemList category={selectedCategory} />
    </div>
  );
}
