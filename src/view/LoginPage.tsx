import { Link, Redirect } from "react-router-dom";
import { Card, Form, Button, Icon, Loader } from "@ahaui/react";
import { useAppDispatch } from "store/store";
import { useSelector } from "react-redux";
import { loginUser, logout, selectUser } from "store/slices/userSlice";
import { LoginForm } from "utils/Types";
import { useForm } from "utils/useForm";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const profile = useSelector(selectUser);
  const loginValidation = {
    password: {
      regex: {
        value: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{6,}$",
        message:
          "Password must have at least 6 characters, including at least one lowercase letter, one uppercase letter, one digit.",
      },
    },
    email: {
      regex: {
        value: "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$",
        message: "Please enter a valid email address.",
      },
    },
  };

  const { formData, handleChange, handleSubmit, errors } = useForm<LoginForm>({
    onSubmit: () => dispatch(loginUser(formData)),
    validations: loginValidation,
  });

  return profile.isAuthenticated ? (
    <Redirect to="/category" />
  ) : (
    <div className="u-flex u-justifyContentCenter">
      <Card body size="large" className="u-paddingLarge u-textCenter border0 w50">
        <h3>Login</h3>
        <Form.Group>
          <Form.InputGroup className="u-marginBottomSmall">
            <Form.InputGroup.Prepend>
              <Button disabled>
                <Icon name="contact" className="u-textLight" />
              </Button>
            </Form.InputGroup.Prepend>
            <Form.Input placeholder="Email" type="email" onChange={handleChange("email")}></Form.Input>
          </Form.InputGroup>
          <Form.Feedback visible={!!errors.email} type="invalid" role="alert">
            {errors.email}
          </Form.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.InputGroup>
            <Form.InputGroup.Prepend>
              <Button disabled>
                <Icon name="lock" className="u-textLight" />
              </Button>
            </Form.InputGroup.Prepend>
            <Form.Input placeholder="Password" type="password" onChange={handleChange("password")} />
          </Form.InputGroup>
          <Form.Feedback visible={!!errors.password} type="invalid" role="alert">
            {errors.password}
          </Form.Feedback>
        </Form.Group>
        <Button
          className="u-marginVerticalMedium"
          variant="primary"
          width="full"
          onClick={handleSubmit}
          disabled={!formData.password || !formData.email}
        >
          Login
        </Button>
        <p>
          Are you new?&nbsp;{" "}
          <Link
            to="/register"
            onClick={() => {
              if (profile.errorMessage) {
                dispatch(logout());
              }
            }}
          >
            Register now
          </Link>
        </p>
        {profile.loading && <Loader size="small" />}
        {profile.errorMessage && <p className="u-textAccent">{profile.errorMessage}</p>}
      </Card>
    </div>
  );
}
