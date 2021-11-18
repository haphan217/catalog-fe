import { render, RenderResult, screen } from "@testing-library/react";
import HomePage from "components/view/HomePage";
import App from "App";
import Login from "components/view/LoginPage";
import Signup from "components/view/Signup";
import TopNav from "components/layout/TopNav";
import { MemoryRouter } from "react-router-dom";

jest.mock("components/layout/TopNav");
jest.mock("view/HomePage");
jest.mock("view/LoginPage");
jest.mock("view/Signup");

const renderApp = (entry: string): RenderResult => {
  (TopNav as jest.Mock).mockImplementation(() => <div>TopNav</div>);
  return render(
    <MemoryRouter initialEntries={[entry]}>
      <App />
    </MemoryRouter>,
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

  test("should render signup page for signup route", () => {
    (Signup as jest.Mock).mockImplementation(() => <div>Register Page</div>);
    renderApp("/register");
    expect(screen.getByText("Register Page")).toBeInTheDocument();
  });
});
