import { setupServer } from "msw/node";
import { rest } from "msw";
import { API } from "utils/constants";
import { ListResponseDTO } from "utils/DTO";
import { render, RenderResult, screen, waitForElementToBeRemoved } from "@testing-library/react";
import HomePage from "components/view/HomePage";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import userEvent from "@testing-library/user-event";

/* eslint-disable */
const sampleRes: ListResponseDTO = {
  item_per_page: 20,
  total_items: 2,
  items: [],
};
const sampleResHasItems: ListResponseDTO = {
  item_per_page: 20,
  total_items: 2,
  items: [
    {
      id: 1,
      name: "cate",
      authorId: 1,
    },
  ],
};
/* eslint-enable */

const mockStore = configureStore();

const loggedInState = {
  userReducer: {
    isAuthenticated: true,
    loading: false,
    user: { name: "user", id: 1 },
    errorMessage: "",
  },
};

const notLoginState = {
  userReducer: {
    isAuthenticated: false,
    loading: false,
    user: { name: "user", id: 1 },
    errorMessage: "",
  },
};

const renderComponentInProvider = (initialState: any): RenderResult => {
  const store = mockStore(initialState);
  return render(
    <Provider store={store}>
      <HomePage />
    </Provider>,
  );
};

const serverReturnsEmpty = setupServer(
  rest.get(`${API}/categories`, async (req: any, res, ctx) => {
    return res(ctx.status(200), ctx.json(sampleRes));
  }),
);

const server = setupServer(
  rest.get(`${API}/categories`, async (req: any, res, ctx) => {
    return res(ctx.status(200), ctx.json(sampleResHasItems));
  }),
  rest.get(`${API}/categories/1/items`, async (req: any, res, ctx) => {
    return res(ctx.status(200), ctx.json([]));
  }),
);

describe("Home Page", () => {
  describe("Home Page/Empty", () => {
    beforeAll(() => serverReturnsEmpty.listen());
    afterAll(() => serverReturnsEmpty.close());
    test("Empty State when login", async () => {
      renderComponentInProvider(loggedInState);
      await waitForElementToBeRemoved(screen.getByTestId("loader"));
      expect(screen.getByText(/nothing/i)).toBeInTheDocument();
      userEvent.click(screen.getByRole("button", { name: /category/i }));
    });

    test("Empty State when not login", async () => {
      renderComponentInProvider(notLoginState);
      await waitForElementToBeRemoved(screen.getByTestId("loader"));
      expect(screen.getByText(/please login/i)).toBeInTheDocument();
    });
  });

  describe("HomePage/Has data", () => {
    beforeAll(() => server.listen());
    afterAll(() => server.close());

    test("should render category list", async () => {
      renderComponentInProvider(notLoginState);
      await waitForElementToBeRemoved(screen.getByTestId("loader"));
      expect(screen.getByRole("button", { name: "cate" })).toBeInTheDocument();
    });
  });
});
