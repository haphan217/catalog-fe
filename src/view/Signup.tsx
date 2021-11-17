import { Link, Redirect } from "react-router-dom";
import { Card, Form, Button, Icon, Loader } from "@ahaui/react";
import { useAppDispatch } from "store/store";
import { useSelector } from "react-redux";
import { logout, registerUser, selectUser } from "store/slices/userSlice";
import { SignupForm } from "utils/Types";
import { useForm } from "utils/useForm";

export default function SignupPage() {
  const dispatch = useAppDispatch();
  const profile = useSelector(selectUser);
  const signupValidation = {
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
  const { formData, handleChange, handleSubmit, errors } = useForm<SignupForm>({
    onSubmit: () => dispatch(registerUser(formData)),
    validations: signupValidation,
  });

  return profile.isAuthenticated ? (
    <Redirect to="/category" />
  ) : (
    <div className="u-flex u-justifyContentCenter">
      <Card body size="large" className="u-paddingLarge u-textCenter border0 w50">
        <h3>Register</h3>
        <Form.Group>
          <Form.InputGroup className="u-marginBottomSmall">
            <Form.InputGroup.Prepend>
              <Button disabled>
                <Icon name="contact" className="u-textLight" />
              </Button>
            </Form.InputGroup.Prepend>
            <Form.Input placeholder="Username" type="text" onChange={handleChange("username")}></Form.Input>
          </Form.InputGroup>
        </Form.Group>
        <Form.Group>
          <Form.InputGroup className="u-marginBottomSmall">
            <Form.InputGroup.Prepend>
              <Button disabled>
                <Icon name="mail" className="u-textLight" />
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
          disabled={!formData.password || !formData.username || !formData.email}
        >
          Register
        </Button>
        <p>
          Already have an account?&nbsp;{" "}
          <Link
            to="/login"
            onClick={() => {
              if (profile.errorMessage) {
                dispatch(logout());
              }
            }}
          >
            Login now
          </Link>
        </p>
        {profile.loading && <Loader size="small" />}
        {profile.errorMessage && <p className="u-textAccent">{profile.errorMessage}</p>}
      </Card>
    </div>
  );
}
