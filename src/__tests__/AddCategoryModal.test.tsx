import { render, RenderResult, screen, act, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddCategoryModal from "components/HomePage/AddCategoryModal";
import { Category } from "utils/Types";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { API, AuthTestData } from "utils/constants";
import { Provider } from "react-redux";
import store from "store/store";
import ModalContainer from "components/layout/ModalContainer";

const sampleCategory: Category = {
  name: "category",
  id: 1,
  authorId: 1,
};

const server = setupServer(
  rest.post(`${API}/categories`, async (req: any, res, ctx) => {
    if (req.body.name === "m") {
      return res(ctx.status(400), ctx.json({ error_message: AuthTestData.ERROR })); //eslint-disable-line
    }
    return res(ctx.json(sampleCategory));
  }),
);

beforeAll(() => server.listen());
afterAll(() => server.close());

const renderModalInProvider = (handleSubmitCategory: (c: Category) => void): RenderResult => {
  return render(
    <Provider store={store}>
      <ModalContainer />
      <AddCategoryModal onSubmitCategory={handleSubmitCategory} />
    </Provider>,
  );
};

describe("AddCategoryModal", () => {
  const handleSubmitCategory = jest.fn();

  test("should show correct input field", () => {
    renderModalInProvider(handleSubmitCategory);
    const categoryField = screen.getByRole("textbox", { name: /category name/i });
    expect(categoryField).toBeInTheDocument();
  });

  test("should be able to submit form after input category name", () => {
    renderModalInProvider(handleSubmitCategory);
    const addButton = screen.getByRole("button", { name: /add/i });
    expect(addButton).toBeDisabled();
    userEvent.type(screen.getByRole("textbox", { name: /category name/i }), sampleCategory.name);
    expect(addButton).toBeEnabled();
  });

  test("submit form with correct input category", async () => {
    renderModalInProvider(handleSubmitCategory);
    const addButton = screen.getByRole("button", { name: /add/i });
    await act(async () => userEvent.type(screen.getByRole("textbox", { name: /category name/i }), sampleCategory.name));
    await act(async () => userEvent.click(addButton));
    await waitForElementToBeRemoved(() => screen.getByTestId(/loader/i));
    expect(handleSubmitCategory).toHaveBeenCalledTimes(1);
    expect(handleSubmitCategory).toHaveBeenCalledWith(sampleCategory);
  });

  test("add existed category should show error", async () => {
    renderModalInProvider(handleSubmitCategory);
    const addButton = screen.getByRole("button", { name: /add/i });
    await act(async () => userEvent.type(screen.getByRole("textbox", { name: /category name/i }), "m"));
    await act(async () => userEvent.click(addButton));
    await waitForElementToBeRemoved(() => screen.getByTestId(/loader/i));
    const alert = screen.getByRole("alert");
    expect(alert.textContent).toMatchInlineSnapshot(`"Bad request"`);
  });
});
