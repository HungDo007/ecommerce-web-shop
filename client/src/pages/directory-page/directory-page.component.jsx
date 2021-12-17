import { Route } from "react-router";

import DirectoryItems from "../../components/directory-items/directory-items";
import Directory from "../../components/directory/directory.component";

const DirectoryPage = ({ match }) => {
  return (
    <div className="homepage">
      <Route exact path={`${match.path}`} component={Directory} />
      <Route path={`${match.path}/:directoryId`} component={DirectoryItems} />
    </div>
  );
};

export default DirectoryPage;
