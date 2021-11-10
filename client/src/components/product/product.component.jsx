// import SHOP_DATA from "./data";

import { useState, useEffect } from "react";

import CustomButton from "../custom-button/custom-button.component";
import ProductItem from "../product-item/product-item.component";

import catalogApi from "../../api/catalog-api";

import "./product.styles.scss";

const Product = () => {
  // const collection = Object.values(SHOP_DATA);
  // const productArr = collection.map((i) => i.items);
  // const product = [].concat.apply([], productArr);

  const [productList, setProductList] = useState([]);

  const numberOfItems = 4;
  const [items, setItems] = useState(numberOfItems);

  const handleMore = () => {
    setItems(items + numberOfItems);
  };

  useEffect(() => {
    const getProductList = async () => {
      try {
        const response = await catalogApi.getAllProduct();
        setProductList(response);
      } catch (error) {
        console.log("Failed to get products: ", error.response);
      }
    };
    getProductList();
  }, []);

  return (
    <>
      <div className="product-title">Product</div>
      <div className="product">
        <div className="items">
          {productList
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
