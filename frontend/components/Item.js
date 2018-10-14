import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Link from "next/link";

import formatMoney from "../lib/formatMoney";
import DeleteItem from "./DeleteItem";
import Title from "./styles/Title";
import ItemStyles from "./styles/ItemStyles";
import PriceTag from "./styles/PriceTag";

class Item extends PureComponent {
  render() {
    const { item } = this.props;
    return (
      <ItemStyles>
        {item.image && <img src={item.image} alt={item.title} />}
        <Title>
          <Link
            href={{
              pathname: "/item",
              query: { id: item.id }
            }}
          >
            <a>{item.title}</a>
          </Link>
        </Title>
        <PriceTag>{formatMoney(item.price)}</PriceTag>
        <p>{item.description}</p>
        <div className="buttonList">
          <Link
            href={{
              pathname: "/update",
              query: { id: item.id }
            }}
          >
            <a>Edit</a>
          </Link>
          <Link
            href={{
              pathname: "/update",
              query: { id: item.id }
            }}
          >
            <a>Add to Cart</a>
          </Link>
          <DeleteItem id={item.id} label="Delete item" />
        </div>
      </ItemStyles>
    );
  }
}

Item.propTypes = {
  item: PropTypes.object.isRequired
};

export default Item;
