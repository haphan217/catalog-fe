import { setupServer } from "msw/node";
import { rest } from "msw";
import { API } from "utils/constants";
import { ListResponseDTO } from "utils/DTO";
import { render, RenderResult, screen, waitForElementToBeRemoved } from "@testing-library/react";
import HomePage from "components/view/HomePage";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import userEvent from "@testing-library/user-event";

const sampleRes: ListResponseDTO = {
  item_per_page: 20, //eslint-disable-line
  total_items: 2, //eslint-disable-line
  items: [],
};
const mockStore = configureStore();

const renderComponentInProvider = (): RenderResult => {
  const loggedInState = {
    userReducer: {
      isAuthenticated: true,
      loading: false,
      user: { name: "user", id: 1 },
      errorMessage: "",
    },
  };
  const store = mockStore(loggedInState);
  return render(
    <Provider store={store}>
      <HomePage />
    </Provider>,
  );
};

const server = setupServer(
  rest.get(`${API}/categories`, async (req: any, res, ctx) => {
    return res(ctx.status(200), ctx.json(sampleRes));
  }),
);

beforeAll(() => server.listen());
afterAll(() => server.close());

describe("Home Page", () => {
  test("Empty State", async () => {
    renderComponentInProvider();
    await waitForElementToBeRemoved(screen.getByTestId("loader"));
    expect(screen.getByText(/nothing/i)).toBeInTheDocument();
    userEvent.click(screen.getByRole("button", { name: /category/i }));
  });
});