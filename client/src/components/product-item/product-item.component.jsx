import { useState } from "react";
import { Redirect, useHistory } from "react-router";
import { Link } from "react-router-dom";
import "./product-item.styles.scss";

const ProductItem = ({ item }) => {
  const { id, name, price, imageUrl } = item;
  const history = useHistory();
  //const [clicked, setClicked] = useState(false)
  const goToProduct = () => {
    //setClicked(true);
    history.push({
      pathname: "/product",
      state: `${id}`,
    });
  };

  return (
    <div className="product-item" onClick={goToProduct}>
      <div className="image" style={{ backgroundImage: `url(${imageUrl})` }} />
      <div className="product-footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
    </div>
  );
};

export default ProductItem;
