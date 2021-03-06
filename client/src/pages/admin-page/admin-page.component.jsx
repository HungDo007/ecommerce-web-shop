import { Route, Switch } from "react-router-dom";

import ManageAccountPage from "./manage-account-page/manage-account-page.component";
import ManageComponentPage from "./manage-component-page/manage-component-page.component";
import ManageDirectoryPage from "./manage-directory-page/manage-directory-page.component";
import ManageProductPage from "./manage-product-page/manage-product-page.component";
import Profile from "../../components/profile/profile.component";

const AdminPage = ({ match }) => {
  return (
    <div>
      <Switch>
        <Route exact path={match.path} component={Profile} />
        <Route path={`${match.path}/account`} component={ManageAccountPage} />
        <Route
          path={`${match.path}/component`}
          component={ManageComponentPage}
        />
        <Route
          path={`${match.path}/directory`}
          component={ManageDirectoryPage}
        />
        <Route path={`${match.path}/product`} component={ManageProductPage} />
      </Switch>
    </div>
  );
};

export default AdminPage;
