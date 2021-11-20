import LoginPage from "components/view/LoginPage";
import HomePage from "components/view/HomePage";
import { render, RenderResult, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import App from "App";
import { Provider } from "react-redux";
import ModalContainer from "components/layout/ModalContainer";
import TopNav from "components/layout/TopNav";
jest.mock("components/view/HomePage");
jest.mock("components/view/LoginPage");
jest.mock("components/layout/ModalContainer");
jest.mock("components/layout/TopNav");

const mockStore = configureStore();
const loggedInState = {
  userReducer: {
    isAuthenticated: true,
    loading: false,
    user: { name: "user", id: 1 },
    errorMessage: "",
  },
};

const notLoginState = {
  userReducer: {
    isAuthenticated: false,
    loading: false,
    user: { name: "user", id: 1 },
    errorMessage: "",
  },
};

const renderApp = (entry: string, initialState: any): RenderResult => {
  (HomePage as jest.Mock).mockImplementation(() => <div>HomePage</div>);
  (LoginPage as jest.Mock).mockImplementation(() => <div>Login Page</div>);
  (ModalContainer as jest.Mock).mockImplementation(() => <div>ModalContainer</div>);
  (TopNav as jest.Mock).mockImplementation(() => <div>TopNav</div>);

  const store = mockStore(initialState);

  return render(
    <MemoryRouter initialEntries={[entry]}>
      <Provider store={store}>
        <App />
      </Provider>
    </MemoryRouter>,
  );
};

describe("Redirect Route", () => {
  test("logged in user should be redirected to homepage", () => {
    renderApp("/login", loggedInState);
    expect(screen.getByText("HomePage")).toBeInTheDocument();
  });
  test("not logged in user stays at the page", () => {
    renderApp("/login", notLoginState);
    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });
});
