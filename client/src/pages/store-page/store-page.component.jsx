import { Route, Switch } from "react-router-dom";
import StoreProfile from "../../components/store-profile/store-profile.component";
import StoreManagesProduct from "./store-manage-product/store-manage-product.component";
import StoreProduct from "./store-manage-product/store-product/store-product.component";

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
        {/* <Route
          path={`${match.path}/product/:productId`}
          component={StoreProduct}
        /> */}
      </Switch>
    </div>
  );
};

export default StorePage;
