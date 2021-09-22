import Directory from "../../components/directory/directory.component";
import Product from "../../components/product/product.component";

import "./homepage.styles.scss";

import SHOP_DATA from "../../components/product/data";

const HomePage = () => {
  const collections = Object.values(SHOP_DATA);
  const productArr = collections.map((i) => i.items);
  const allProducts = [].concat.apply([], productArr);

  return (
    <div className="homepage">
      <Directory />
      <Product products={allProducts} />
    </div>
  );
};

export default HomePage;
