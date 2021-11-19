import { render, screen, RenderResult, act, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DeleteModal from "components/common/DeleteModal";
import { Item, Category } from "utils/Types";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { API } from "utils/constants";
import { Provider } from "react-redux";
import store from "store/store";
import ModalContainer from "components/layout/ModalContainer";
const item: Item = {
  name: "sample item",
  description: "sample description",
  authorId: 1,
  categoryId: 1,
  id: 1,
};

const server = setupServer(
  rest.delete(`${API}/categories/1/items/1`, async (req: any, res, ctx) => {
    return res(ctx.status(200));
  }),
);

beforeAll(() => server.listen());
afterAll(() => server.close());

const renderModalInProvider = (handleDelete: (i: Item | Category) => void): RenderResult => {
  return render(
    <Provider store={store}>
      <ModalContainer />
      <DeleteModal item={item} onDelete={handleDelete} type="Item" />
    </Provider>,
  );
};
describe("DeleteModal", () => {
  const handleDelete = jest.fn();
  test("should display correct to be deleted item", () => {
    renderModalInProvider(handleDelete);
    expect(screen.getByText(item.name)).toBeInTheDocument();
  });

  test("should let user delete item", async () => {
    renderModalInProvider(handleDelete);
    const deleteBtn = screen.getByRole("button", { name: "Delete" });
    await act(async () => userEvent.click(deleteBtn));
    await waitForElementToBeRemoved(() => screen.getByTestId(/loader/i));
    expect(handleDelete).toHaveBeenCalledTimes(1);
    expect(handleDelete).toHaveBeenCalledWith(item);
  });
});
