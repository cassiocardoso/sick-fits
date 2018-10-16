import PropTypes from "prop-types";

import Items from "../components/Items";

const Index = ({ query }) => (
  <div>
    <Items page={parseFloat(query.page) || 1} />
  </div>
);

Index.propTypes = {
  query: PropTypes.object.isRequired
};

export default Index;
