import PropTypes from "prop-types";
import styled from "styled-components";

import Signup from "../components/Signup";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
`;

const SignupPage = ({}) => (
  <Grid>
    <Signup />
    <Signup />
    <Signup />
  </Grid>
);

SignupPage.propTypes = {};

export default SignupPage;
