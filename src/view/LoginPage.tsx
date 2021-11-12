import { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Card, Form, Button, Icon } from "@ahaui/react";
import { useAppDispatch } from "store/store";
import { useSelector } from "react-redux";
import { loginUser, selectUser } from "store/slices/userSlice";
import { LoginForm } from "utils/Types";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const profile = useSelector(selectUser);
  const [loginForm, setLoginForm] = useState<LoginForm>({ username: "", password: "" });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setLoginForm({ ...loginForm, [id]: value });
  };

  const handleLogin = () => {
    dispatch(loginUser(loginForm));
  };

  useEffect(() => {
    console.log(profile);
  }, [profile]);

  return profile.isAuthenticated ? (
    <Redirect to="/category" />
  ) : (
    <div className="u-flex u-justifyContentCenter">
      <Card body size="large" className="u-paddingLarge u-textCenter">
        <h3>Login</h3>
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
          onClick={handleLogin}
          disabled={!loginForm.password || !loginForm.username}
        >
          Login
        </Button>
        <p>
          Are you new?&nbsp; <Link to="/signup">Signup now</Link>
        </p>
      </Card>
    </div>
  );
}
