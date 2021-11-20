import { render, screen, RenderResult, act, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DeleteModal from "components/HomePage/DeleteModal";
import { Item, Category } from "utils/Types";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { API, AuthTestData } from "utils/constants";
import { Provider } from "react-redux";
import store from "store/store";
import ModalContainer from "components/layout/ModalContainer";
import { notifyPositive } from "components/layout/ToastSuccess";

const item: Item = {
  name: "sample item",
  description: "sample description",
  authorId: 1,
  categoryId: 1,
  id: 1,
};
const cate: Category = {
  name: "cate",
  id: 1,
  authorId: 1,
};

const server = setupServer(
  rest.delete(`${API}/categories/1/items/1`, async (req: any, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.delete(`${API}/categories/1`, async (req: any, res, ctx) => {
    return res(ctx.status(200));
  }),
);

const failedServer = setupServer(
  rest.delete(`${API}/categories/1/items/1`, async (req: any, res, ctx) => {
    return res(ctx.status(400), ctx.json(AuthTestData.ERROR));
  }),
);

const renderModalInProvider = (handleDelete: (i: Item | Category) => void, type: string): RenderResult => {
  return render(
    <Provider store={store}>
      <ModalContainer />
      <DeleteModal item={type === "Item" ? item : cate} onDelete={handleDelete} type={type} />
    </Provider>,
  );
};
describe("Delete Modal/Working Server", () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());
  const handleDelete = jest.fn();
  test("should display correct item to be deleted", () => {
    renderModalInProvider(handleDelete, "Item");
    expect(screen.getByText(item.name)).toBeInTheDocument();
  });

  test("should display correct category to be deleted", async () => {
    renderModalInProvider(handleDelete, "Category");
    const deleteBtn = screen.getByRole("button", { name: "Delete" });
    expect(screen.getByText(cate.name)).toBeInTheDocument();
    await act(async () => userEvent.click(deleteBtn));
  });

  test("should let user delete item", async () => {
    const mock = jest.fn().mockImplementation(() => notifyPositive("Success"));
    renderModalInProvider(mock, "Item");
    const deleteBtn = screen.getByRole("button", { name: "Delete" });
    await act(async () => userEvent.click(deleteBtn));
    expect(mock).toHaveBeenCalledWith(item);
  });
});

describe("Delete Modal/Failed Server", () => {
  beforeAll(() => failedServer.listen());
  afterAll(() => failedServer.close());
  const handleDelete = jest.fn();
  test("should show error when server fails", async () => {
    renderModalInProvider(handleDelete, "Item");
    const deleteBtn = screen.getByRole("button", { name: "Delete" });
    await act(async () => userEvent.click(deleteBtn));
    await waitForElementToBeRemoved(() => screen.getByTestId(/loader/i));
    expect(screen.getByRole("alert").textContent).toMatchInlineSnapshot(`"Bad request"`);
  });
});
