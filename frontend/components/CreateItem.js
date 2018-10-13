import React, { PureComponent } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";

import formatMoney from "../lib/formatMoney";
import ErrorMessage from "./ErrorMessage";
import Form from "./styles/Form";

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
      title
    }
  }
`;

class CreateItem extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      image: "",
      largeImage: "",
      description: "",
      price: 0
    };
  }

  handleInputChange = e => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;

    this.setState({ [name]: val });
  };

  uploadFile = async e => {
    const { files } = e.target;
    const data = new FormData();

    data.append("file", files[0]);
    data.append("upload_preset", "sickfits");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/cassiocardoso/image/upload/",
      {
        method: "POST",
        body: data
      }
    );
    const file = await res.json();

    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url
    });
  };

  render() {
    const { description, image, title, price } = this.state;

    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(createItem, { loading, error }) => (
          <Form
            onSubmit={async e => {
              e.preventDefault();

              // call the mutation function
              const res = await createItem();

              Router.push({
                pathname: "/item",
                query: { id: res.data.createItem.id }
              });
            }}
          >
            <ErrorMessage error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor="title">
                Title
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Item title"
                  value={title}
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
                  value={price}
                  onChange={this.handleInputChange}
                  required
                />
              </label>
              <label htmlFor="image">
                Image
                <input
                  type="file"
                  id="image"
                  name="image"
                  placeholder="Upload an image"
                  onChange={this.uploadFile}
                />
                {image && (
                  <img src={image} width="150" alt={`[PREVIEW] ${title}`} />
                )}
              </label>
              <label htmlFor="description">
                Description
                <textarea
                  id="description"
                  name="description"
                  placeholder="Item description..."
                  value={description}
                  onChange={this.handleInputChange}
                  required
                />
              </label>
              <button type="submit">Submit</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export { CREATE_ITEM_MUTATION };
export default CreateItem;
