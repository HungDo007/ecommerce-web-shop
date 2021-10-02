import { Route, Switch } from "react-router-dom";
import StoreProfile from "../../components/store-profile/store-profile.component";

const StorePage = ({ match }) => {
  return (
    <div>
      <Switch>
        <Route exact path={match.path} component={StoreProfile} />
      </Switch>
    </div>
  );
};

export default StorePage;
