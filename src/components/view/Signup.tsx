import { Link } from "react-router-dom";
import { Card, Form, Button, Icon, Loader } from "@ahaui/react";
import { useAppDispatch } from "store/store";
import { useSelector } from "react-redux";
import { logout, registerUser, selectUser } from "store/slices/userSlice";
import { SignUpForm } from "utils/Types";
import { useForm } from "hooks/useForm";
import { FormValidation } from "utils/constants";

export default function SignUpPage() {
  const dispatch = useAppDispatch();
  const profile = useSelector(selectUser);

  const signUpValidation = {
    password: {
      regex: {
        value: FormValidation.PASSWORD_REGEX,
        message: FormValidation.PASSWORD_ERROR,
      },
    },
    email: {
      regex: {
        value: FormValidation.EMAIL_REGEX,
        message: FormValidation.EMAIL_ERROR,
      },
    },
  };
  const { formData, handleChange, handleSubmit, errors } = useForm<SignUpForm>({
    onSubmit: () => dispatch(registerUser(formData)),
    validations: signUpValidation,
  });

  return (
    <div className="u-flex u-justifyContentCenter">
      <Card body size="large" className="u-paddingLarge border0 w50">
        <h3 className="u-textCenter">Register</h3>
        <Form.Group>
          <Form.InputGroup>
            <Form.InputGroup.Prepend>
              <Button disabled>
                <Icon name="contact" className="u-textLight" />
              </Button>
            </Form.InputGroup.Prepend>
            <Form.Input placeholder="Username" type="text" onChange={handleChange("username")}></Form.Input>
          </Form.InputGroup>
        </Form.Group>
        <Form.Group>
          <Form.InputGroup>
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
          disabled={!formData.password || !formData.username || !formData.email || errors.email || errors.password}
        >
          Register
        </Button>
        <div className="u-textCenter">
          <p>
            Already have an account?&nbsp;
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
          {profile.loading && <Loader data-testid="loader" size="small" />}
          {profile.errorMessage && (
            <p className="u-textAccent" role="alert">
              {profile.errorMessage}
            </p>
          )}
        </div>
      </Card>
    </div>
  );
}
