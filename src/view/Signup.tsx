import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Card, Form, Button, Icon } from "@ahaui/react";
import { useAppDispatch } from "store/store";
import { useSelector } from "react-redux";
import { registerUser, selectUser } from "store/slices/userSlice";
import { SignupForm } from "utils/Types";

export default function SignupPage() {
  const dispatch = useAppDispatch();
  const profile = useSelector(selectUser);
  const [regForm, setRegForm] = useState<SignupForm>({ username: "", password: "", email: "" });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setRegForm({ ...regForm, [id]: value });
  };

  const handleRegister = () => {
    dispatch(registerUser(regForm));
  };

  return profile.isAuthenticated ? (
    <Redirect to="/category" />
  ) : (
    <div className="u-flex u-justifyContentCenter">
      <Card body size="large" className="u-paddingLarge u-textCenter">
        <h3>Sign Up</h3>
        <Form.Group>
          <Form.InputGroup className="u-marginBottomSmall">
            <Form.InputGroup.Prepend>
              <Button disabled>
                <Icon name="contact" className="u-textLight" />
              </Button>
            </Form.InputGroup.Prepend>
            <Form.Input placeholder="Username" type="text" id="username" onChange={handleChange}></Form.Input>
          </Form.InputGroup>
        </Form.Group>
        <Form.Group>
          <Form.InputGroup className="u-marginBottomSmall">
            <Form.InputGroup.Prepend>
              <Button disabled>
                <Icon name="mail" className="u-textLight" />
              </Button>
            </Form.InputGroup.Prepend>
            <Form.Input placeholder="Email" type="email" id="email" onChange={handleChange}></Form.Input>
          </Form.InputGroup>
        </Form.Group>
        <Form.Group>
          <Form.InputGroup>
            <Form.InputGroup.Prepend>
              <Button disabled>
                <Icon name="lock" className="u-textLight" />
              </Button>
            </Form.InputGroup.Prepend>
            <Form.Input placeholder="Password" type="password" id="password" onChange={handleChange} />
          </Form.InputGroup>
        </Form.Group>
        <Button
          className="u-marginVerticalMedium"
          variant="primary"
          width="full"
          onClick={handleRegister}
          disabled={!regForm.password || !regForm.username}
        >
          Sign up
        </Button>
        <p>
          Already have an account?&nbsp; <Link to="/login">Login now</Link>
        </p>
      </Card>
    </div>
  );
}
