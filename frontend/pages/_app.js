import App, { Container } from "next/app";
import PropTypes from "prop-types";

import Page from "../components/Page";

class MyApp extends App {
  render() {
    const { Component } = this.props;

    return (
      <Container>
        <Page>
          <Component />
        </Page>
      </Container>
    );
  }
}

MyApp.propTypes = {
  Component: PropTypes.node.isRequired
};

export default MyApp;