import { setupServer } from "msw/node";
import { rest } from "msw";
import { API, ModalKey } from "utils/constants";
import { ListResponseDTO } from "utils/DTO";
import { act, render, RenderResult, screen, waitForElementToBeRemoved } from "@testing-library/react";
import HomePage from "components/HomePage";
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";
import ModalContainer from "components/layout/ModalContainer";
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "store/slices/userSlice";
import modalSlice from "store/slices/modalSlice";
import { Category } from "utils/Types";

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

const loggedInState = {
  userReducer: {
    isAuthenticated: true,
    loading: false,
    user: { name: "user", id: 1 },
    errorMessage: "",
  },
  modalReducer: {
    modalContent: {
      modalName: ModalKey.ADD_CATEGORY,
      modalProps: {},
    },
  },
};

const notLoginState = {
  userReducer: {
    isAuthenticated: false,
    loading: false,
    user: { name: "user", id: 1 },
    errorMessage: "",
  },
  modalReducer: {
    modalContent: {
      modalName: ModalKey.ADD_CATEGORY,
      modalProps: {},
    },
  },
};

export function renderWithRedux(
  ui: any,
  {
    preloadedState,
    store = configureStore({ reducer: { userReducer: userSlice, modalReducer: modalSlice }, preloadedState }),
    ...renderOptions
  } = {},
) {
  function Wrapper({ children }: any) {
    return <Provider store={store}>{children}</Provider>;
  }
  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

const renderComponentInProvider = (initialState: any): RenderResult => {
  return renderWithRedux(
    <>
      <HomePage />
      <ModalContainer />
    </>,
    { preloadedState: initialState },
  );
};

const sampleCategory: Category = {
  name: "category",
  id: 1,
  authorId: 1,
};
const serverReturnsEmpty = setupServer(
  rest.get(`${API}/categories`, async (req: any, res, ctx) => {
    return res(ctx.status(200), ctx.json(sampleRes));
  }),
  rest.post(`${API}/categories`, async (req: any, res, ctx) => {
    return res(ctx.json(sampleCategory));
  }),
);

const server = setupServer(
  rest.get(`${API}/categories`, async (req: any, res, ctx) => {
    return res(ctx.status(200), ctx.json(sampleResHasItems));
  }),
  rest.get(`${API}/categories/1/items`, async (req: any, res, ctx) => {
    return res(ctx.status(200), ctx.json([]));
  }),
  rest.delete(`${API}/categories/1`, async (req: any, res, ctx) => {
    return res(ctx.status(200));
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
      await act(async () => userEvent.type(screen.getByRole("textbox", { name: /category name/i }), "y"));
      await act(async () => userEvent.click(screen.getByRole("button", { name: /add/i })));
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
