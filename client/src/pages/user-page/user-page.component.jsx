import { Route, Switch } from "react-router";
import Profile from "../../components/profile/profile.component";

const UserPage = ({ match }) => {
  return (
    <div>
      <Switch>
        <Route exact path={match.path} component={Profile} />
      </Switch>
    </div>
  );
};

export default UserPage;
