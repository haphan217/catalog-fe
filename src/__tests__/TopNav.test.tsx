import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import userEvent from "@testing-library/user-event";
import { render, screen, RenderResult, act } from "@testing-library/react";
import TopNav from "components/layout/TopNav";
import { MemoryRouter } from "react-router-dom";

const mockStore = configureStore();

const renderComponentInProvider = (isAuthenticated: boolean, entry: string): RenderResult => {
  const loggedInState = {
    userReducer: {
      isAuthenticated: isAuthenticated,
      loading: false,
      user: { name: "user", id: 1 },
      errorMessage: "",
    },
  };
  const store = mockStore(loggedInState);
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[entry]}>
        <TopNav />
      </MemoryRouter>
    </Provider>,
  );
};

describe("Top Navigation Bar", () => {
  test("show login button if not logged in", () => {
    renderComponentInProvider(false, "/");
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  test("show user name and logout button if logged in", () => {
    renderComponentInProvider(true, "/");
    expect(screen.getByText(/user/i)).toBeInTheDocument();
    const toggler = screen.getByTestId("logout");
    expect(toggler).toBeInTheDocument();
    act(() => userEvent.click(toggler));
    const logout = screen.getByText("Logout");
    act(() => userEvent.click(logout));
  });

  test("in login page, hide login button and show back to home button", () => {
    renderComponentInProvider(false, "/login");
    expect(screen.getByTestId("back-icon")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /login/i })).not.toBeInTheDocument();
  });
});
