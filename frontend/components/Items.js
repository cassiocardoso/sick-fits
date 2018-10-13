import React, { PureComponent } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";

import Item from "./Item";

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY {
    items {
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
    return (
      <Center>
        <h1>Items</h1>
        <Query query={ALL_ITEMS_QUERY}>
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

export default Items;
