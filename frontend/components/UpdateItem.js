import React, { PureComponent } from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";

import formatMoney from "../lib/formatMoney";
import ErrorMessage from "./ErrorMessage";
import Form from "./styles/Form";

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
    }
  }
`;

const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $id: ID!
    $title: String
    $description: String
    $price: Int
  ) {
    updateItem(
      id: $id
      title: $title
      description: $description
      price: $price
    ) {
      id
      title
    }
  }
`;

class CreateItem extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleInputChange = e => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;

    this.setState({ [name]: val });
  };

  handleUpdateItem = async (e, updateItemMutation) => {
    e.preventDefault();
    const { id } = this.props;

    // only run mutation if at least 1 field has changed
    if (Object.keys(this.state).length > 0) {
      const res = await updateItemMutation({
        variables: {
          id,
          ...this.state
        }
      });
    }
  };

  render() {
    const { id } = this.props;
    const { description, image, title, price } = this.state;

    return (
      <Query
        query={SINGLE_ITEM_QUERY}
        variables={{
          id
        }}
      >
        {({ data, loading }) => {
          if (loading) {
            return <p>Loading...</p>;
          }

          if (!data.item) {
            return <p>No item found for ID: {id}</p>;
          }

          return (
            <Mutation mutation={UPDATE_ITEM_MUTATION} variables={this.state}>
              {(updateItem, { loading, error }) => (
                <Form onSubmit={e => this.handleUpdateItem(e, updateItem)}>
                  <ErrorMessage error={error} />
                  <fieldset disabled={loading} aria-busy={loading}>
                    <label htmlFor="title">
                      Title
                      <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Item title"
                        defaultValue={data.item.title}
                        onChange={this.handleInputChange}
                        required
                      />
                    </label>
                    <label htmlFor="price">
                      Price
                      <input
                        type="number"
                        id="price"
                        name="price"
                        placeholder="Item price"
                        defaultValue={data.item.price}
                        onChange={this.handleInputChange}
                        required
                      />
                    </label>
                    <label htmlFor="description">
                      Description
                      <textarea
                        id="description"
                        name="description"
                        placeholder="Item description..."
                        defaultValue={data.item.description}
                        onChange={this.handleInputChange}
                        required
                      />
                    </label>
                    <button type="submit">
                      Submit
                      {loading && "ting"}
                    </button>
                  </fieldset>
                </Form>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export { UPDATE_ITEM_MUTATION };
export default CreateItem;
