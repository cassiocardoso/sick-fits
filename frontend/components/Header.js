import Link from "next/link";
import styled from "styled-components";

import Nav from "./Nav";

const Logo = styled.h1`
  font-size: 4rem;
  margin-left: 2rem;
  position: relative;
  transform: skew(-7deg);
  z-index: 2;

  a {
    background: ${({ theme }) => theme.red};
    color: ${({ theme }) => theme.white};
    padding: 0.5rem 1rem;
    text-decoration: none;
    text-transform: uppercase;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    margin: 0;
    text-align: center;
  }
`;

const StyledHeader = styled.header`
  .bar {
    align-items: stretch;
    border-bottom: 10px solid ${({ theme }) => theme.black};
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;

    @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
      grid-template-columns: 1fr;
      justify-content: center;
    }
  }

  .sub-bar {
    border-bottom: 2px solid ${({ theme }) => theme.lightgrey};
    display: grid;
    grid-template-columns: 1fr auto;
  }
`;

const Header = () => (
  <StyledHeader>
    <div className="bar">
      <Logo>
        <Link href="/">
          <a>Sick Fits</a>
        </Link>
      </Logo>
      <Nav />
    </div>
    <div className="sub-bar">
      <p>Search</p>
    </div>
    <div>Cart</div>
  </StyledHeader>
);

export default Header;
