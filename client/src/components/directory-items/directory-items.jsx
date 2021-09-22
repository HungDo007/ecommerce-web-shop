import Product from "../product/product.component";

import SHOP_DATA from "../product/data";

const DirectoryItems = ({ match }) => {
  const directory = SHOP_DATA[match.params.directoryId];
  const { items } = directory;
  return (
    <div className="homepage">
      <Product products={items} />
    </div>
  );
};

export default DirectoryItems;
