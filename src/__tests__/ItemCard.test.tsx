import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { render, screen, RenderResult, waitForElementToBeRemoved } from "@testing-library/react";
import { Category, Item } from "utils/Types";
import ItemCard from "components/HomePage/ItemCard";

const sampleItem: Item = {
  name: "sample",
  description: "desc",
  id: 1,
  authorId: 1,
  categoryId: 1,
};

const mockStore = configureStore();

const renderComponentInProvider = (
  onDeleteItem: (item: Item | Category) => void,
  isAuthenticated: boolean,
): RenderResult => {
  const loggedInState = {
    userReducer: {
      isAuthenticated: isAuthenticated,
      loading: false,
      user: { name: "user", id: 1 },
      errorMessage: "",
    },
  };

  const store = mockStore(loggedInState);
  return render(
    <Provider store={store}>
      <ItemCard initItem={sampleItem} onDeleteItem={onDeleteItem} />
    </Provider>,
  );
};

describe("Item Card", () => {
  const handleDeleteItem = jest.fn();

  test("show correct item info", () => {
    renderComponentInProvider(handleDeleteItem, true);
    const name = screen.getByText("sample");
    const desc = screen.getByText("desc");
    expect(name).toBeInTheDocument();
    expect(desc).toBeInTheDocument();
  });

  test("hide dropdown button if not logged in", async () => {
    renderComponentInProvider(handleDeleteItem, false);
    const toggler = screen.queryByTestId("dropdown-card");
    expect(toggler).not.toBeInTheDocument();
  });

  test("show dropdown button for logged in author", async () => {
    renderComponentInProvider(handleDeleteItem, true);
    const toggler = screen.getByTestId("dropdown-card");
    expect(toggler).toBeInTheDocument();
  });
});
