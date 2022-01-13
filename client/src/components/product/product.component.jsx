import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

import { Pagination } from "@material-ui/lab";
import { CircularProgress } from "@material-ui/core";

import ProductItem from "../product-item/product-item.component";
import NotFoundPage from "../../pages/not-found-page/not-found.component";

import catalogApi from "../../api/catalog-api";

import "./product.styles.scss";

const Product = ({ search }) => {
  const { directoryId } = useParams();

  const [productPaging, setProductPaging] = useState({
    items: [],
    pageCount: 0,
  });
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("loading");

  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const getProductPaging = async () => {
      try {
        const params = {
          keyword: search ? search : "",
          catId: directoryId ? directoryId : 0,
          pageIndex: page,
          pageSize: 6,
        };
        await catalogApi.getAllProduct(params).then((response) => {
          if (response.items.length !== 0) {
            setStatus("found");
          } else {
            setStatus("not-found");
          }
          setProductPaging(response);
        });
      } catch (error) {
        setStatus("not-found");
      }
    };
    getProductPaging();
  }, [page, directoryId, currentUser, search]);

  const handleChangePage = (event, page) => {
    setPage(page);
    setStatus("loading");
  };

  return (
    <>
      {status === "found" ? (
        <>
          <div className="product-title">Product</div>
          <div className="product">
            <div className="items">
              {productPaging.items.map((item) => (
                <ProductItem key={item.id} item={item} />
              ))}
            </div>
          </div>
          <div className="more-button">
            <Pagination
              count={productPaging?.pageCount}
              defaultPage={page}
              onChange={(event, page) => handleChangePage(event, page)}
              shape="rounded"
              color="primary"
            />
          </div>
        </>
      ) : status === "loading" ? (
        <div className="loading">
          <CircularProgress style={{ height: "80px", width: "80px" }} />
        </div>
      ) : (
        <NotFoundPage />
      )}
    </>
  );
};

export default Product;
