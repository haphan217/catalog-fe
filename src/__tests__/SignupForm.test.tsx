import { render, screen, waitForElementToBeRemoved, RenderResult } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { setupServer } from "msw/node";
import { rest } from "msw";
import store from "store/store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import HomePage from "view/HomePage";
import SignupPage from "view/Signup";

jest.mock("view/HomePage");

const renderSignupInProvider = (): RenderResult => {
  (HomePage as jest.Mock).mockImplementation(() => <div>HomePage</div>);
  return render(
    <Provider store={store}>
      <SignupPage />
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
    return res(ctx.json(req.body));
  }),
);

beforeAll(() => server.listen());
afterAll(() => server.close());

describe("SignupForm", () => {
  const inputField = {
    name: "validname",
    password: "Validpass123",
    invalidPassword: "invalid",
    email: "valid@gmail.com",
    invalidEmail: "invalid",
  };
  test("should display username, password, email field and submit button", () => {
    renderSignupInProvider();
    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign up/i })).toBeInTheDocument();
  });

  test("should be able to submit form after fill out all fields", () => {
    renderSignupInProvider();
    const signupBtn = screen.getByRole("button", { name: /sign up/i });
    expect(signupBtn).toBeDisabled();
    userEvent.type(screen.getByPlaceholderText(/username/i), inputField.name);
    userEvent.type(screen.getByPlaceholderText(/password/i), inputField.password);
    userEvent.type(screen.getByPlaceholderText(/email/i), inputField.email);
    expect(signupBtn).toBeEnabled();
  });

  test("should have correct error messages when fields are invalid", () => {
    renderSignupInProvider();
    userEvent.type(screen.getByPlaceholderText(/username/i), inputField.name);
    userEvent.type(screen.getByPlaceholderText(/password/i), inputField.invalidPassword);
    userEvent.type(screen.getByPlaceholderText(/email/i), inputField.invalidEmail);
    userEvent.click(screen.getByRole("button", { name: /sign up/i }));
    const [firstAlert, secondAlert] = screen.getAllByRole("alert");
    expect(firstAlert.textContent).toMatchInlineSnapshot(`"Please enter a valid email address."`);
    expect(secondAlert.textContent).toMatchInlineSnapshot(
      `"Password must have at least 6 characters, including at least one lowercase letter, one uppercase letter, one digit."`,
    );
  });

  test("redirect to home page when signup successfully.", async () => {
    const { container } = renderSignupInProvider();
    const signupBtn = screen.getByRole("button", { name: /sign up/i });
    userEvent.type(screen.getByPlaceholderText(/username/i), inputField.name);
    userEvent.type(screen.getByPlaceholderText(/password/i), inputField.password);
    userEvent.type(screen.getByPlaceholderText(/email/i), inputField.email);
    userEvent.click(signupBtn);
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
    // expect(container.firstChild).toBeNull();
    expect(screen.getByText("HomePage")).toBeInTheDocument();
  });
});
