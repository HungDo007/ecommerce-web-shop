import { Route } from "react-router";

import ProductDetailPage from "../product-detail-page/product-detail-page.component";

import "./product-page.styles.scss";

const ProductPage = () => {
  return (
    <div>
      <Route path="/product/:productId" component={ProductDetailPage} />
    </div>
  );
};

export default ProductPage;
