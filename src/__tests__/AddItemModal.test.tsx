import { render, RenderResult, screen, act, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Item } from "utils/Types";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { API, AuthTestData } from "utils/constants";
import { Provider } from "react-redux";
import store from "store/store";
import ModalContainer from "components/layout/ModalContainer";
import AddItemModal from "components/HomePage/AddItemModal";

const sampleItem: Item = {
  name: "sample",
  description: "sample dex",
  authorId: 1,
  categoryId: 1,
  id: 1,
};

const server = setupServer(
  rest.post(`${API}/categories/1/items`, async (req: any, res, ctx) => {
    if (req.body.name === "m") {
      return res(ctx.status(400), ctx.json({ error_message: AuthTestData.ERROR })); //eslint-disable-line
    }
    console.log("add item");
    return res(ctx.status(200), ctx.json(sampleItem));
  }),
  rest.put(`${API}/categories/1/items/1`, async (req: any, res, ctx) => {
    return res(ctx.status(200), ctx.json(sampleItem));
  }),
);

beforeAll(() => server.listen());
afterAll(() => server.close());

const renderModalInProvider = (handleSubmitItem: (i: Item) => void, editingItem?: Item): RenderResult => {
  return render(
    <Provider store={store}>
      <ModalContainer />
      <AddItemModal onSubmitItem={handleSubmitItem} editingItem={editingItem} categoryId={1} />
    </Provider>,
  );
};

describe("AddItemModal", () => {
  const handleSubmitItem = jest.fn();

  test("should show correct input field", () => {
    renderModalInProvider(handleSubmitItem);
    const nameField = screen.getByRole("textbox", { name: /item name/i });
    const descField = screen.getByRole("textbox", { name: /item description/i });
    expect(nameField).toBeInTheDocument();
    expect(descField).toBeInTheDocument();
  });

  test("submit form with correct input category", async () => {
    const submitMock = jest.fn();
    renderModalInProvider(submitMock);
    const addButton = screen.getByRole("button", { name: /add/i });
    await act(async () => userEvent.type(screen.getByRole("textbox", { name: /item name/i }), sampleItem.name));
    await act(async () =>
      userEvent.type(screen.getByRole("textbox", { name: /item description/i }), sampleItem.description),
    );
    await act(async () => userEvent.click(addButton));
    await waitForElementToBeRemoved(() => screen.getByTestId(/loader/i));
    expect(submitMock).toHaveBeenCalledTimes(1);
    expect(submitMock).toHaveBeenCalledWith(sampleItem);
  });

  test("should be able to submit form after input item info", async () => {
    renderModalInProvider(handleSubmitItem);
    const addButton = screen.getByRole("button", { name: /add/i });
    expect(addButton).toBeDisabled();
    await act(async () => userEvent.type(screen.getByRole("textbox", { name: /item name/i }), sampleItem.name));
    await act(async () =>
      userEvent.type(screen.getByRole("textbox", { name: /item description/i }), sampleItem.description),
    );
    expect(addButton).toBeEnabled();
  });

  test("modal initiated with editing item", async () => {
    renderModalInProvider(handleSubmitItem, sampleItem);
    const nameField = screen.getByRole("textbox", { name: /item name/i });
    expect(screen.getByRole("heading", { name: /edit/i })).toBeInTheDocument();
    expect(nameField).toHaveValue(sampleItem.name);
    await act(async () => userEvent.type(nameField, "1"));
    await act(async () => userEvent.click(screen.getByRole("button", { name: /edit/i })));
    const alert = screen.getByRole("alert");
    expect(alert.textContent).toMatchInlineSnapshot(`""`);
  });

  test("add existed item should show error", async () => {
    renderModalInProvider(handleSubmitItem);
    const addButton = screen.getByRole("button", { name: /add/i });
    await act(async () => userEvent.type(screen.getByRole("textbox", { name: /item name/i }), "m"));
    await act(async () => userEvent.click(addButton));
    await waitForElementToBeRemoved(() => screen.queryByTestId(/loader/i));
    const alert = screen.getByRole("alert");
    expect(alert.textContent).toMatchInlineSnapshot(`"Bad request"`);
  });
});
