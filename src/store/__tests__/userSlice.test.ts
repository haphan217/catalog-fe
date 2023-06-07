import reducer, { logout, SliceState } from "store/slices/userSlice";
import store from "store/store";

describe("test redux user slice", () => {
  test("states when user is not logged in", () => {
    expect(store.getState().userReducer.isAuthenticated).toBeFalsy();
  });

  // test("states when user is logged in", () => {
  //   const initialState = reducer(undefined, { type: "" });
  //   expect(initialState.isAuthenticated).toBeTruthy();
  // });

  test("State changes to be authenticated after user logged in", async () => {
    const currentState = store.getState().userReducer;
    expect(currentState.isAuthenticated).toBeFalsy();
    expect(reducer(undefined, { type: "user/login/pending" }).loading).toBeTruthy();
    expect(reducer(undefined, { type: "user/login/fulfilled" }).isAuthenticated).toBeTruthy();
  });

  test("Login fail should not change state", async () => {
    const currentState = store.getState().userReducer;
    expect(currentState.isAuthenticated).toBeFalsy();
    expect(reducer(undefined, { type: "user/login/pending" }).loading).toBeTruthy();
    expect(reducer(undefined, { type: "user/login/rejected" }).isAuthenticated).toBeFalsy();
  });

  test("State changes to be authenticated after user registered", async () => {
    const currentState = store.getState().userReducer;
    expect(currentState.isAuthenticated).toBeFalsy();
    expect(reducer(undefined, { type: "user/register/pending" }).loading).toBeTruthy();
    expect(reducer(undefined, { type: "user/register/fulfilled" }).isAuthenticated).toBeTruthy();
    // expect(currentState.isAuthenticated).toBeTruthy();
  });

  test("Register fail should not change state", async () => {
    const currentState = store.getState().userReducer;
    expect(currentState.isAuthenticated).toBeFalsy();
    expect(reducer(undefined, { type: "user/register/pending" }).loading).toBeTruthy();
    expect(reducer(undefined, { type: "user/register/rejected" }).isAuthenticated).toBeFalsy();
  });

  test("State changes to be not authenticated after user logged out", () => {
    const loggedInState: SliceState = {
      isAuthenticated: true,
      loading: false,
      user: { name: "user" },
      errorMessage: "",
    };
    expect(reducer(loggedInState, logout()).isAuthenticated).toBeFalsy();
  });
});
