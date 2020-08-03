import React from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import API from "../utils/PAPI.js";
import { toast } from "react-toastify";
import UserContext from "../contexts/UserContext.js";

class Login extends React.Component {
  state = { email: "", password: "", status: "", loading: false };
  static contextType = UserContext;

  handleChange = async (e, { name, value }) => this.setState({ [name]: value });
  submitLoginForm = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;

    const requestBody = {
      username: email,
      password,
    };

    const userLoginData = await API.post("/users/login", requestBody);
    console.log({ UserContext });

    if (userLoginData.status !== 200) {
      this.setState({ status: "error" });
      toast.error("Auth Failed!");
    } else {
      const { token, id, username } = userLoginData.data;

      if (token && id) {
        await this.context.login(token, id, username);
        window.location.reload();
        toast.success("Signined in sucessfully");
      }
    }
  };

  render() {
    console.log(this.props);
    const { email, password } = this.state;
    return (
      <Grid textAlign="center" verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="#1b1c1d" textAlign="center">
            Log-in to your account
          </Header>
          <Form size="large" error>
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                name="email"
                value={email}
                placeholder="E-mail address"
                onChange={this.handleChange}
              />
              <Form.Input
                fluid
                icon="lock"
                name="password"
                value={password}
                iconPosition="left"
                placeholder="Password"
                type="password"
                onChange={this.handleChange}
              />
              {this.state.status === "error" && (
                <Message
                  error
                  header="Auth Failed"
                  content="Please write correct emailId and password"
                />
              )}
              <Button
                loading={this.state.loading}
                color="#1b1c1d"
                fluid
                size="large"
                onClick={(event) => {
                  this.setState({ loading: true });
                  this.submitLoginForm(event);
                }}
              >
                Login
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Login;
