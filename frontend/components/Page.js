import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled, { ThemeProvider, injectGlobal } from "styled-components";

import Meta from "./Meta";
import Header from "./Header";

const theme = {
  black: "#393939",
  breakpoints: {
    sm: "400px",
    md: "800px",
    lg: "1300px"
  },
  bs: "0 12px 24px 0 rgba(0, 0, 0, 0.09)",
  grey: "#3a3a3a",
  lightgrey: "#e1e1e1",
  offwhite: "#ededed",
  maxwidth: "1000px",
  red: "#f00",
  white: "#fff"
};

const StyledPage = styled.div`
  background: ${({ theme }) => theme.white};
  color: ${({ theme }) => theme.black};
`;

const Inner = styled.div`
  max-width: ${({ theme }) => theme.maxwidth};
  margin: 0 auto;
  padding: 2rem;
`;

injectGlobal`
  @font-face {
    font-family: 'radnika-next';
    src: url('/static/radnikanext-medium-webfont.woff2') format('woff2');
    font-style: normal;
    font-weight: normal;
  }

  html {
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    font-family: 'radnika-next';
    font-size: 1.5rem;
    line-height: 2;
    margin: 0;
    padding: 0;
  }

  a {
    color: ${theme.black};
    text-decoration: none;
  }
`;

class Page extends PureComponent {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledPage>
          <Meta />
          <Header />
          <Inner>{this.props.children}</Inner>
        </StyledPage>
      </ThemeProvider>
    );
  }
}

Page.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]).isRequired
};

export default Page;
