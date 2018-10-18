import React, { PureComponent } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import ErrorMessage from "./ErrorMessage";
import Form from "./styles/Form";

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    signup(email: $email, name: $name, password: $password) {
      id
      email
      name
    }
  }
`;

class Signup extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleInputChange = e => {
    e.preventDefault();
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  handleSignUp = async (e, signup) => {
    e.preventDefault();

    const res = await signup();

    // clear the form after the data is saved
    this.setState({ email: "", name: "", password: "" });
  };

  render() {
    const { email, name, password } = this.state;
    return (
      <Mutation mutation={SIGNUP_MUTATION} variables={this.state}>
        {(signup, { error, loading }) => (
          <Form method="post" onSubmit={e => this.handleSignUp(e, signup)}>
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Sign Up for an account</h2>
              <ErrorMessage error={error} />
              <label htmlFor="email">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your e-mail"
                  value={email}
                  onChange={this.handleInputChange}
                />
              </label>
              <label htmlFor="name">
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={this.handleInputChange}
                />
              </label>
              <label htmlFor="password">
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={this.handleInputChange}
                />
              </label>
              <button type="submit">Sign Up!</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default Signup;
