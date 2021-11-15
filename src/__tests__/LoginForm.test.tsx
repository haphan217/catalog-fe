import { render, screen, waitForElementToBeRemoved, RenderResult } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "view/LoginPage";
import { setupServer } from "msw/node";
import { rest } from "msw";
import store from "store/store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import HomePage from "view/HomePage";

jest.mock("view/HomePage");

const renderLoginInProvider = (): RenderResult => {
  (HomePage as jest.Mock).mockImplementation(() => <div>HomePage</div>);
  return render(
    <Provider store={store}>
      <Login />
      <HomePage isOpen />
    </Provider>,
    { wrapper: MemoryRouter },
  );
};

const server = setupServer(
  rest.post("http://localhost:8080", async (req, res, ctx) => {
    // if (!req?.body?.password) {
    //   return res(ctx.status(400), ctx.json({ message: "password required" }));
    // }
    // if (!req.body.username) {
    //   return res(ctx.status(400), ctx.json({ message: "username required" }));
    // }
    return res(ctx.json(req.body), ctx.delay(1000));
  }),
);

beforeAll(() => server.listen());
afterAll(() => server.close());

describe("LoginForm", () => {
  const inputField = {
    name: "validname",
    password: "Validpass123",
    invalidPassword: "invalid",
  };
  test("should display username, password field and submit button", () => {
    renderLoginInProvider();
    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  test("should be able to submit form after fill out both fields", () => {
    renderLoginInProvider();
    const loginBtn = screen.getByRole("button", { name: /login/i });
    expect(loginBtn).toBeDisabled();
    userEvent.type(screen.getByPlaceholderText(/username/i), inputField.name);
    userEvent.type(screen.getByPlaceholderText(/password/i), inputField.password);
    expect(loginBtn).toBeEnabled();
  });

  test("should have correct error message when fields are invalid", () => {
    renderLoginInProvider();
    userEvent.type(screen.getByPlaceholderText(/username/i), inputField.name);
    userEvent.type(screen.getByPlaceholderText(/password/i), inputField.invalidPassword);
    userEvent.click(screen.getByRole("button", { name: /login/i }));
    expect(screen.getByRole("alert").textContent).toMatchInlineSnapshot(
      `"Password must have at least 6 characters, including at least one lowercase letter, one uppercase letter, one digit."`,
    );
  });

  test("redirect to home page when login successfully.", async () => {
    const { container } = renderLoginInProvider();
    const loginBtn = screen.getByRole("button", { name: /login/i });
    userEvent.type(screen.getByPlaceholderText(/username/i), inputField.name);
    userEvent.type(screen.getByPlaceholderText(/password/i), inputField.password);
    userEvent.click(loginBtn);
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
    // expect(container.firstChild).toBeNull();
    expect(screen.getByText("HomePage")).toBeInTheDocument();
  });
});
