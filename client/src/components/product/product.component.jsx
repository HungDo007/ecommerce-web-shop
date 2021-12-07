// import SHOP_DATA from "./data";

import { useState, useEffect } from "react";

import { Pagination } from "@material-ui/lab";

import ProductItem from "../product-item/product-item.component";

import catalogApi from "../../api/catalog-api";

import "./product.styles.scss";
import { useParams } from "react-router";
import { CircularProgress } from "@material-ui/core";

const Product = () => {
  // const collection = Object.values(SHOP_DATA);
  // const productArr = collection.map((i) => i.items);
  // const product = [].concat.apply([], productArr);

  const { directoryId } = useParams();

  const [productPaging, setProductPaging] = useState({
    items: [],
    pageCount: 0,
  });
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const getProductPaging = async () => {
      try {
        const params = {
          catId: directoryId ? directoryId : 0,
          pageIndex: page,
          pageSize: 6,
        };
        await catalogApi.getAllProduct(params).then((response) => {
          setProductPaging(response);
        });
        setLoading(false);
      } catch (error) {
        console.log("Failed to get products: ", error.response);
      }
    };
    getProductPaging();
  }, [page, directoryId]);

  const handleChangePage = (event, page) => {
    setPage(page);
    setLoading(true);
  };

  return (
    <>
      <div className="product-title">Product</div>
      <div className="product">
        {isLoading ? (
          <div>
            <CircularProgress />
          </div>
        ) : (
          <div className="items">
            {productPaging.items
              // .filter((item, index) => index < 4)
              .map((item) => (
                <ProductItem key={item.id} item={item} />
              ))}
          </div>
        )}
      </div>
      <div className="more-button">
        <Pagination
          count={productPaging?.pageCount}
          defaultPage={1}
          onChange={(event, page) => handleChangePage(event, page)}
          shape="rounded"
          color="primary"
        />
      </div>
    </>
  );
};

export default Product;
