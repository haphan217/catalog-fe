import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { render, screen, RenderResult } from "@testing-library/react";
import CategoryList from "components/HomePage/CategoryList";
import { Category } from "utils/Types";
import userEvent from "@testing-library/user-event";

const sampleCategory: Category[] = [
  {
    name: "sample",
    id: 1,
    authorId: 1,
  },
  {
    name: "sample2",
    id: 2,
    authorId: 1,
  },
];

const mockStore = configureStore();

const renderComponentInProvider = (
  onSelectCategory: (categoryId: number) => void,
  onAddCategory: () => void,
  onScrollToEnd: () => void,
  isAuthenticated: boolean,
): RenderResult => {
  const loggedInState = {
    userReducer: {
      isAuthenticated: isAuthenticated,
      loading: false,
      user: { name: "user" },
      errorMessage: "",
    },
  };
  const store = mockStore(loggedInState);
  return render(
    <Provider store={store}>
      <CategoryList
        selectedCategory={1}
        onSelectCategory={onSelectCategory}
        categories={sampleCategory}
        onAddCategory={onAddCategory}
        totalCategories={1}
        onScrollToEnd={onScrollToEnd}
      />
    </Provider>,
  );
};

describe("Category List", () => {
  const handleSelectCategory = jest.fn();
  const handleAddCategory = jest.fn();
  const handleScrollToEnd = jest.fn();

  test("show add category button and all categories", async () => {
    renderComponentInProvider(handleSelectCategory, handleAddCategory, handleScrollToEnd, true);
    const addButton = screen.getByRole("button", { name: /category/i });
    const [categoryBtn1] = screen.getAllByRole("button", { name: /sample/i });
    expect(categoryBtn1).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
  });

  test("hide add category button if not logged in", () => {
    renderComponentInProvider(handleSelectCategory, handleAddCategory, handleScrollToEnd, false);
    const addButton = screen.queryByRole("button", { name: /category/i });
    expect(addButton).not.toBeInTheDocument();
  });

  test("change active category", () => {
    renderComponentInProvider(handleSelectCategory, handleAddCategory, handleScrollToEnd, true);
    const [cate1, cate2] = screen.getAllByRole("button", { name: /sample/i });
    expect(cate1).toHaveClass("is-active");
    userEvent.click(cate2);
    expect(handleSelectCategory).toHaveBeenCalledTimes(1);
    expect(handleSelectCategory).toHaveBeenCalledWith(2);
  });
});
