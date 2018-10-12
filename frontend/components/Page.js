import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import Meta from "./Meta";
import Header from "./Header";

class Page extends PureComponent {
  render() {
    return (
      <div>
        <Meta />
        <Header />
        {this.props.children}
      </div>
    );
  }
}

Page.propTypes = {
  children: PropTypes.oneOf([PropTypes.node, PropTypes.arrayOf(PropTypes.node)])
    .isRequired
};

export default Page;
