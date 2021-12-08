import Product from "../product/product.component";

const DirectoryItems = (props) => {
  return (
    <div className="homepage">
      <Product search={props.location.state} />
    </div>
  );
};

export default DirectoryItems;
