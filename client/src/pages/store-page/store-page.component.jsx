import { Route, Switch } from "react-router-dom";

import StoreProfile from "../../components/store-profile/store-profile.component";
import StoreManagesProduct from "./store-manage-product/store-manage-product.component";
import StoreProduct from "./store-manage-product/store-product/store-product.component";
import StoreManagesOrder from "./store-manage-order/store-manage-order.component";

const StorePage = ({ match }) => {
  return (
    <div>
      <Switch>
        <Route exact path={match.path} component={StoreProfile} />
        <Route
          path={`${match.path}/manageProduct`}
          component={StoreManagesProduct}
        />
        <Route exact path={`${match.path}/product`} component={StoreProduct} />
        <Route
          path={`${match.path}/manageOrder`}
          component={StoreManagesOrder}
        />
      </Switch>
    </div>
  );
};

export default StorePage;
