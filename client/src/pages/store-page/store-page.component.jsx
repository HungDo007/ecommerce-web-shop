import { useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import StoreProfile from "../../components/store-profile/store-profile.component";
import StoreManagesProduct from "./store-manage-product/store-manage-product.component";
import StoreProduct from "./store-manage-product/store-product/store-product.component";

import userApi from "../../api/user-api";

const StorePage = ({ match, currentUser, history }) => {
  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const response = await userApi.getProfile(currentUser.unique_name);
        if (response.emailConfirmed) {
          history.replace("/store");
        } else {
          history.replace("/user");
        }
      } catch (error) {
        console.log("Failed to get user profile: ", error.response);
      }
    };
    getUserProfile();
  }, [currentUser.unique_name, history]);

  return (
    <div>
      <Switch>
        <Route exact path={match.path} component={StoreProfile} />
        <Route
          path={`${match.path}/manageProduct`}
          component={StoreManagesProduct}
        />
        <Route exact path={`${match.path}/product`} component={StoreProduct} />
      </Switch>
    </div>
  );
};

export default StorePage;
