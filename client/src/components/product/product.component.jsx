// import SHOP_DATA from "./data";

import CustomButton from "../custom-button/custom-button.component";
import ProductItem from "../product-item/product-item.component";

import "./product.styles.scss";
import { useState } from "react";

const Product = ({ products }) => {
  // const collection = Object.values(SHOP_DATA);
  // const productArr = collection.map((i) => i.items);
  // const product = [].concat.apply([], productArr);

  const numberOfItems = 4;
  const [items, setItems] = useState(numberOfItems);

  const handleMore = () => {
    setItems(items + numberOfItems);
  };
  return (
    <>
      <div className="product-title">Product</div>
      <div className="product">
        <div className="items">
          {products
            .filter((item, index) => index < items)
            .map((item) => (
              <ProductItem key={item.id} item={item} />
            ))}
        </div>
      </div>
      <div className="more-button">
        <CustomButton onClick={handleMore}>See more...</CustomButton>
      </div>
    </>
  );
};

export default Product;
