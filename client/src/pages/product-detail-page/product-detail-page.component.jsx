const ProductDetailPage = ({ location }) => {
  console.log(location);
  return <div>Product detail with id: {location.state}</div>;
};

export default ProductDetailPage;
