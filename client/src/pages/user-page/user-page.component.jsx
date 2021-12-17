import { Route, Switch } from "react-router";

import Profile from "../../components/profile/profile.component";
import NotFoundPage from "../not-found-page/not-found.component";

const UserPage = ({ match }) => {
  return (
    <div>
      <Switch>
        <Route exact path={match.path} component={Profile} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </div>
  );
};

export default UserPage;
