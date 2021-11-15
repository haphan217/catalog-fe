import reducer, { loginUser, logout, SliceState } from "store/slices/userSlice";
import { LoginForm } from "utils/Types";
import { setupServer } from "msw/node";
import { rest } from "msw";
import store from "store/store";
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
    const sampleForm: LoginForm = {
      username: "username",
      password: "password",
    };
    expect(currentState.isAuthenticated).toBeFalsy();

    expect(reducer(undefined, { type: "user/login/pending" }).loading).toBeTruthy();
    expect(reducer(undefined, { type: "user/login/fulfilled" }).isAuthenticated).toBeTruthy();

    store.dispatch(loginUser(sampleForm));
    console.log(currentState);
    // expect(store.getState().userReducer.loading).toBeTruthy();

    // expect(await currentState.isAuthenticated).toBeTruthy();
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
