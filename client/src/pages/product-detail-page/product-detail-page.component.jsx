import ProductInfo from "../../components/product-info/product-info.component";

import "./product-detail-page.styles.css";

const ProductDetailPage = ({ match }) => {
  return <ProductInfo productId={match.params.productId} />;
};

export default ProductDetailPage;
