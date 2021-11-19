import { render, screen, waitForElementToBeRemoved, RenderResult } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "components/view/LoginPage";
import { setupServer } from "msw/node";
import { rest } from "msw";
import store from "store/store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import HomePage from "components/view/HomePage";
import { API, AuthTestData } from "utils/constants";

jest.mock("components/view/HomePage");

const renderLoginInProvider = (): RenderResult => {
  (HomePage as jest.Mock).mockImplementation(() => <div>HomePage</div>);
  return render(
    <Provider store={store}>
      <Login />
      <HomePage />
    </Provider>,
    { wrapper: MemoryRouter },
  );
};

const server = setupServer(
  rest.post(API + "/auth", async (req: any, res, ctx) => {
    if (req.body?.password === AuthTestData.WRONG_PASSWORD) {
      return res(ctx.status(400), ctx.json({ error_message: AuthTestData.ERROR })); //eslint-disable-line
    }
    return res(ctx.json(req.body), ctx.delay(1000));
  }),
  rest.get(API + "/users/me", async (req: any, res, ctx) => {
    return res(ctx.status(200));
  }),
);

beforeAll(() => server.listen());
afterAll(() => server.close());

describe("LoginForm", () => {
  test("should display email, password field and submit button", () => {
    renderLoginInProvider();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  test("should be able to submit form after fill out both fields", () => {
    renderLoginInProvider();
    const loginBtn = screen.getByRole("button", { name: /login/i });
    expect(loginBtn).toBeDisabled();
    userEvent.type(screen.getByPlaceholderText(/email/i), AuthTestData.EMAIL);
    userEvent.type(screen.getByPlaceholderText(/password/i), AuthTestData.PASSWORD);
    expect(loginBtn).toBeEnabled();
  });

  test("should have correct error message when fields are invalid", () => {
    renderLoginInProvider();
    userEvent.type(screen.getByPlaceholderText(/email/i), AuthTestData.INVALID_EMAIL);
    userEvent.type(screen.getByPlaceholderText(/password/i), AuthTestData.INVALID_PASSWORD);
    userEvent.click(screen.getByRole("button", { name: /login/i }));
    const [firstAlert, secondAlert] = screen.getAllByRole("alert");
    expect(firstAlert.textContent).toMatchInlineSnapshot(`"Please enter a valid email address."`);
    expect(secondAlert.textContent).toMatchInlineSnapshot(
      `"Password must have at least 6 characters, including at least one lowercase letter, one uppercase letter, one digit."`,
    );
  });

  test("should have correct error message for incorrect password", async () => {
    renderLoginInProvider();
    userEvent.type(screen.getByPlaceholderText(/email/i), AuthTestData.EMAIL);
    userEvent.type(screen.getByPlaceholderText(/password/i), AuthTestData.WRONG_PASSWORD);
    userEvent.click(screen.getByRole("button", { name: /login/i }));
    const [firstAlert, secondAlert, thirdAlert] = screen.getAllByRole("alert");
    expect(thirdAlert.textContent).toMatchInlineSnapshot();
  });

  test("redirect to home page when login successfully.", async () => {
    renderLoginInProvider();
    const loginBtn = screen.getByRole("button", { name: /login/i });
    userEvent.type(screen.getByPlaceholderText(/email/i), AuthTestData.EMAIL);
    userEvent.type(screen.getByPlaceholderText(/password/i), AuthTestData.PASSWORD);
    userEvent.click(loginBtn);
    await waitForElementToBeRemoved(() => screen.getByTestId(/loader/i));
    expect(screen.getByText("HomePage")).toBeInTheDocument();
  });
});
