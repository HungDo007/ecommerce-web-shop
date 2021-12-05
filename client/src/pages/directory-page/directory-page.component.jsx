import { Route, useRouteMatch } from "react-router";
import DirectoryItems from "../../components/directory-items/directory-items";
import Directory from "../../components/directory/directory.component";

const DirectoryPage = ({ match }) => {
  //const match = useRouteMatch();
  return (
    <div className="homepage">
      <Route exact path={`${match.path}`} component={Directory} />
      <Route path="/directory/:directoryId" component={DirectoryItems} />
    </div>
  );
};

export default DirectoryPage;
