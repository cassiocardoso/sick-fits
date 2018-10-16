import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";

import { perPage } from "../config";
import Item from "./Item";
import Pagination from "./Pagination";

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    items(first: $first, skip: $skip, orderBy: createdAt_DESC) {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;

const Center = styled.div`
  text-align: center;
`;

const ItemsList = styled.div`
  display: grid;
  grid-gap: 60px;
  grid-template-columns: 1fr 1fr;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.maxWidth};
`;

class Items extends PureComponent {
  render() {
    const { page } = this.props;
    const skippedItems = page * perPage - perPage;

    return (
      <Center>
        <Pagination page={page} />
        <Query
          query={ALL_ITEMS_QUERY}
          variables={{ skip: skippedItems, first: perPage }}
        >
          {({ data, error, loading }) => {
            if (loading) {
              return <p>Loading...</p>;
            }

            if (error) {
              return <p>Oops, we had an error! Error: {error.message}</p>;
            }

            return (
              <ItemsList>
                {data.items.map(item => (
                  <Item key={item.id} item={item} />
                ))}
              </ItemsList>
            );
          }}
        </Query>
      </Center>
    );
  }
}

Items.propTypes = {
  page: PropTypes.number.isRequired
};

export { ALL_ITEMS_QUERY };
export default Items;
