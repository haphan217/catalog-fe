import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { render, screen, RenderResult, waitForElementToBeRemoved, act } from "@testing-library/react";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { API } from "utils/constants";
import { Category, Item } from "utils/Types";
import ItemList from "components/HomePage/ItemList";
import { ListResponseDTO } from "utils/DTO";
import userEvent from "@testing-library/user-event";

const sampleItems: Item[] = [
  {
    name: "sample",
    description: "desc",
    id: 1,
    authorId: 1,
    categoryId: 1,
  },
  {
    name: "sample2",
    description: "desc",
    id: 2,
    authorId: 1,
    categoryId: 1,
  },
];
const sampleRes: ListResponseDTO = {
  item_per_page: 20, //eslint-disable-line
  total_items: 40, //eslint-disable-line
  items: sampleItems,
};

const server = setupServer(
  rest.get(`${API}/categories/1/items`, async (req: any, res, ctx) => {
    return res(ctx.status(200), ctx.json(sampleRes));
  }),
);

beforeAll(() => server.listen());
afterAll(() => server.close());

const mockStore = configureStore();

const renderComponentInProvider = (
  onDeleteCategory: (cat: Category) => void,
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
  const sampleCategory: Category = {
    name: "cate",
    id: 1,
    authorId: 1,
  };
  const store = mockStore(loggedInState);
  return render(
    <Provider store={store}>
      <ItemList category={sampleCategory} onDeleteCategory={onDeleteCategory} />
    </Provider>,
  );
};

describe("Item List", () => {
  const handleDeleteCategory = jest.fn();

  test("show add item button and all items", async () => {
    renderComponentInProvider(handleDeleteCategory, true);
    await waitForElementToBeRemoved(() => screen.getByTestId(/loader/i));
    const addButton = screen.getByRole("button", { name: /item/i });
    const [item1, item2] = screen.getAllByText(/sample/i);
    expect(item1).toBeInTheDocument();
    expect(item2).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
    act(() => userEvent.click(addButton));
  });

  test("hide add item button if not logged in", async () => {
    renderComponentInProvider(handleDeleteCategory, false);
    await waitForElementToBeRemoved(() => screen.getByTestId(/loader/i));
    const addButton = screen.queryByRole("button", { name: /item/i });
    expect(addButton).not.toBeInTheDocument();
  });

  test("show delete category button for author", async () => {
    renderComponentInProvider(handleDeleteCategory, true);
    await waitForElementToBeRemoved(() => screen.getByTestId(/loader/i));
    const toggler = screen.getByTestId("dropdown");
    expect(toggler).toBeInTheDocument();
    act(() => userEvent.click(toggler));
    act(() => userEvent.click(screen.getByText(/delete/i)));
  });
});
