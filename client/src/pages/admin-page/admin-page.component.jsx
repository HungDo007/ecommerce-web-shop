import { Route, Switch } from "react-router-dom";
import ManageAccountPage from "../manage-account-page/manage-account-page.component";
import ManageProductPage from "../manage-product-page/manage-product-page.component";
import Profile from "../../components/profile/profile.component";

import "./admin-page.styles.scss";

const AdminPage = ({ match }) => {
  return (
    <div>
      <Switch>
        <Route exact path={match.path} component={Profile} />
        <Route path={`${match.path}/account`} component={ManageAccountPage} />
        <Route path={`${match.path}/product`} component={ManageProductPage} />
      </Switch>
    </div>
  );
};

export default AdminPage;
