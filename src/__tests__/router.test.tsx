import { render, RenderResult, screen } from "@testing-library/react";
import HomePage from "components/HomePage";
import App from "App";
import Login from "components/view/LoginPage";
import SignUp from "components/view/SignUp";
import TopNav from "components/layout/TopNav";
import ModalContainer from "components/layout/ModalContainer";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "store/store";

jest.mock("components/layout/TopNav");
jest.mock("components/HomePage");
jest.mock("components/view/LoginPage");
jest.mock("components/view/SignUp");
jest.mock("components/layout/ModalContainer");

const renderApp = (entry: string): RenderResult => {
  (TopNav as jest.Mock).mockImplementation(() => <div>TopNav</div>);
  (ModalContainer as jest.Mock).mockImplementation(() => <div>ModalContainer</div>);
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[entry]}>
        <App />
      </MemoryRouter>
    </Provider>,
  );
};

describe("test routing", () => {
  test("should render home page with nav bar by default", () => {
    (HomePage as jest.Mock).mockImplementation(() => <div>HomePage</div>);
    renderApp("/");
    expect(screen.getByText("HomePage")).toBeInTheDocument();
  });

  test("should render home page for invalid route", () => {
    (HomePage as jest.Mock).mockImplementation(() => <div>HomePage</div>);
    renderApp("/invalid");
    expect(screen.getByText("HomePage")).toBeInTheDocument();
  });

  test("should render login page for login route", () => {
    (Login as jest.Mock).mockImplementation(() => <div>Login Page</div>);
    renderApp("/login");
    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });

  test("should render signUp page for signUp route", () => {
    (SignUp as jest.Mock).mockImplementation(() => <div>Register Page</div>);
    renderApp("/register");
    expect(screen.getByText("Register Page")).toBeInTheDocument();
  });
});
