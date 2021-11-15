// import SHOP_DATA from "./data";

import { useState, useEffect } from "react";

import { Pagination } from "@material-ui/lab";

import CustomButton from "../custom-button/custom-button.component";
import ProductItem from "../product-item/product-item.component";

import catalogApi from "../../api/catalog-api";

import "./product.styles.scss";

const Product = () => {
  // const collection = Object.values(SHOP_DATA);
  // const productArr = collection.map((i) => i.items);
  // const product = [].concat.apply([], productArr);

  const [productPaging, setProductPaging] = useState({
    items: [],
    pageCount: 0,
  });
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getProductPaging = async () => {
      try {
        const params = {
          pageIndex: page,
          pageSize: 4,
        };
        const response = await catalogApi.getAllProduct(params);
        setProductPaging(response);
      } catch (error) {
        console.log("Failed to get products: ", error.response);
      }
    };
    getProductPaging();
  }, [page]);

  return (
    <>
      <div className="product-title">Product</div>
      <div className="product">
        <div className="items">
          {productPaging?.items
            .filter((item, index) => index < 4)
            .map((item) => (
              <ProductItem key={item.id} item={item} />
            ))}
        </div>
      </div>
      <div className="more-button">
        <Pagination
          count={productPaging?.pageCount}
          defaultPage={1}
          onChange={(event, page) => setPage(page)}
          shape="rounded"
          color="primary"
        />
      </div>
    </>
  );
};

export default Product;
