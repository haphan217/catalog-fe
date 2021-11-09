import { Card, Form, Button, Icon } from "@ahaui/react";
import { useState } from "react";
import { Link } from "react-router-dom";

type LoginForm = {
  username: string;
  password: string;
};

export default function LoginPage() {
  const [loginForm, setLoginForm] = useState<LoginForm>({ username: "", password: "" });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setLoginForm({ ...loginForm, [id]: value });
  };

  const handleLogin = () => {
    console.log(loginForm);
  };

  return (
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
          Are you new?&nbsp; <Link to="/">Signup now</Link>
        </p>
      </Card>
    </div>
  );
}
