import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Head from "next/head";
import styled from "styled-components";

import ErrorMessage from "./ErrorMessage";

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
      largeImage
    }
  }
`;

const Item = styled.div`
  box-shadow: ${({ theme }) => theme.bs};
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  margin: 2rem auto;
  max-width: 1200px;
  min-height: 800px;

  img {
    height: 100%;
    object-fit: contain;
    width: 100%;
  }

  .details {
    font-size: 2rem;
    margin: 3rem;
  }
`;

class SingleItem extends PureComponent {
  render() {
    const { id } = this.props;

    return (
      <Query query={SINGLE_ITEM_QUERY} variables={{ id }}>
        {({ data, error, loading }) => {
          const { item } = data;
          if (error) {
            return <ErrorMessage error={error} />;
          }

          if (loading) {
            return <p>Loading...</p>;
          }

          if (!data.item) {
            return <p>No item found for id: {id}</p>;
          }

          return (
            <Item>
              <Head>
                <title>Sick Fits | {item.title}</title>
              </Head>
              <img src={item.largeImage} alt={item.title} />
              <div className="details">
                <h2>Viewing {item.title}</h2>
                <p>{item.description}</p>
              </div>
            </Item>
          );
        }}
      </Query>
    );
  }
}

SingleItem.propTypes = {
  id: PropTypes.string.isRequired
};

export default SingleItem;
