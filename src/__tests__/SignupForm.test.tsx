import { render, screen, waitForElementToBeRemoved, RenderResult } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { setupServer } from "msw/node";
import { rest } from "msw";
import store from "store/store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import HomePage from "components/view/HomePage";
import SignupPage from "components/view/Signup";
import { API, AuthTestData } from "utils/constants";

jest.mock("components/view/HomePage");

const renderSignupInProvider = (): RenderResult => {
  (HomePage as jest.Mock).mockImplementation(() => <div>HomePage</div>);
  return render(
    <Provider store={store}>
      <SignupPage />
      <HomePage />
    </Provider>,
    { wrapper: MemoryRouter },
  );
};

const server = setupServer(
  rest.post(API + "/users", async (req: any, res, ctx) => {
    if (req.body?.email === AuthTestData.EXISTED_EMAIL) {
      return res(ctx.status(400), ctx.json({ error_message: AuthTestData.ERROR })); //eslint-disable-line
    }
    return res(ctx.status(200), ctx.delay(1000));
  }),
);

beforeAll(() => server.listen());
afterAll(() => server.close());

describe("SignupForm", () => {
  test("should display username, password, email field and submit button", () => {
    renderSignupInProvider();
    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /register/i })).toBeInTheDocument();
  });

  test("should be able to submit form after fill out all fields", () => {
    renderSignupInProvider();
    const signupBtn = screen.getByRole("button", { name: /register/i });
    expect(signupBtn).toBeDisabled();
    userEvent.type(screen.getByPlaceholderText(/username/i), AuthTestData.NAME);
    userEvent.type(screen.getByPlaceholderText(/password/i), AuthTestData.PASSWORD);
    userEvent.type(screen.getByPlaceholderText(/email/i), AuthTestData.EMAIL);
    expect(signupBtn).toBeEnabled();
  });

  test("should have correct error messages when fields are invalid", () => {
    renderSignupInProvider();
    userEvent.type(screen.getByPlaceholderText(/email/i), AuthTestData.INVALID_EMAIL);
    userEvent.type(screen.getByPlaceholderText(/password/i), AuthTestData.INVALID_PASSWORD);
    userEvent.type(screen.getByPlaceholderText(/username/i), AuthTestData.NAME);
    userEvent.click(screen.getByRole("button", { name: /register/i }));
    const [firstAlert, secondAlert] = screen.getAllByRole("alert");
    expect(firstAlert.textContent).toMatchInlineSnapshot(`"Please enter a valid email address."`);
    expect(secondAlert.textContent).toMatchInlineSnapshot(
      `"Password must have at least 6 characters, including at least one lowercase letter, one uppercase letter, one digit."`,
    );
    userEvent.click(screen.getByText(/login/i));
  });

  test("should have correct error message for existed email account", async () => {
    renderSignupInProvider();
    const signupBtn = screen.getByRole("button", { name: /register/i });
    userEvent.type(screen.getByPlaceholderText(/email/i), AuthTestData.EXISTED_EMAIL);
    userEvent.type(screen.getByPlaceholderText(/password/i), AuthTestData.PASSWORD);
    userEvent.type(screen.getByPlaceholderText(/username/i), AuthTestData.NAME);
    userEvent.click(signupBtn);
    await waitForElementToBeRemoved(() => screen.getByTestId("loader"));
    const [firstAlert, secondAlert, thirdAlert] = screen.getAllByRole("alert");
    expect(thirdAlert.textContent).toMatchInlineSnapshot(`"Bad request"`);
  });

  test("redirect to home page when signup successfully.", async () => {
    renderSignupInProvider();
    const signupBtn = screen.getByRole("button", { name: /register/i });
    userEvent.type(screen.getByPlaceholderText(/email/i), AuthTestData.EMAIL);
    userEvent.type(screen.getByPlaceholderText(/password/i), AuthTestData.PASSWORD);
    userEvent.type(screen.getByPlaceholderText(/username/i), AuthTestData.NAME);
    userEvent.click(signupBtn);
    expect(screen.getByText("HomePage")).toBeInTheDocument();
  });
});
