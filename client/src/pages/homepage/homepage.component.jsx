import Directory from "../../components/directory/directory.component";
import Product from "../../components/product/product.component";
import SwipeableTextMobileStepper from "../../components/banner/banner.component";

import "./homepage.styles.scss";

const HomePage = () => {
  return (
    <div className="homepage">
      <div className="banner-background">
        <SwipeableTextMobileStepper />
      </div>
      <Directory />
      <Product />
    </div>
  );
};

export default HomePage;
