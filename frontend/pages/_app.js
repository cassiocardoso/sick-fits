import App, { Container } from "next/app";
import PropTypes from "prop-types";
import { ApolloProvider } from "react-apollo";

import withData from "../lib/withData";
import Page from "../components/Page";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    // SSR: this is used to go through all the existing Mutation and Query
    // in a page and fetch the necessary data before rendering
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    // this exposes the query to the user
    pageProps.query = ctx.query;

    return { pageProps };
  }

  render() {
    const { apollo, Component, pageProps } = this.props;

    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Page>
            <Component {...pageProps} />
          </Page>
        </ApolloProvider>
      </Container>
    );
  }
}

MyApp.propTypes = {
  apollo: PropTypes.object.isRequired,
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object
};

MyApp.defaultProps = {
  pageProps: {}
};

export default withData(MyApp);
