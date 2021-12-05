import { Route, Switch } from "react-router";
import Profile from "../../components/profile/profile.component";
import ProfileTest from "../../components/profile/profile-tab.component";

const UserPage = ({ match }) => {
  return (
    <div>
      <Switch>
        <Route exact path={match.path} component={ProfileTest} />
      </Switch>
    </div>
  );
};

export default UserPage;
