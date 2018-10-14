import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import { ALL_ITEMS_QUERY } from "./Items";

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;

class DeleteItem extends PureComponent {
  handleDeleteItem = (e, deleteItem) => {
    e.preventDefault();

    if (confirm("Are you sure you want to delete this item?")) {
      deleteItem();
    }
  };

  handleUpdateMutation = (cache, payload) => {
    // cache: is the Apollo cache (store)
    // payload: is the data that was returned from the server

    // manually updates the cache to match the server
    // 1. read the cache for the itens we want
    const data = cache.readQuery({ query: ALL_ITEMS_QUERY });

    // 2. filter the deleted item out of the page
    data.items = data.items.filter(
      item => item.id !== payload.data.deleteItem.id
    );

    // 3. put the remaining itens back in the cache
    cache.writeQuery({ query: ALL_ITEMS_QUERY, data });
  };

  render() {
    const { id, label } = this.props;
    return (
      <Mutation
        mutation={DELETE_ITEM_MUTATION}
        variables={{ id }}
        update={this.handleUpdateMutation}
      >
        {(deleteItem, { error }) => (
          <button onClick={e => this.handleDeleteItem(e, deleteItem)}>
            {label}
          </button>
        )}
      </Mutation>
    );
  }
}

DeleteItem.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

export default DeleteItem;
