import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import "./App.css";

import AdminPage from "./pages/admin-page/admin-page.component";
import HomePage from "./pages/homepage/homepage.component";
import DirectoryPage from "./pages/directory-page/directory-page.component";
import ProductPage from "./pages/product-page/product-page.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import Sidebar from "./components/sidebar/sidebar.component";

const App = ({ currentUser }) => {
  // currentUser ? console.log("có user") : console.log("user is null");
  // user.currentUser
  //   ? user.currentUser.role == "Admin"
  //     ? console.log("is admin")
  //     : console.log("not admin")
  //   : console.log("null");
  return (
    <div>
      <Sidebar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/admin" component={AdminPage} />
        <Route path="/directory" component={DirectoryPage} />
        <Route path="/product" component={ProductPage} />
        <Route
          exact
          path="/signin"
          render={() =>
            currentUser ? (
              currentUser.role === "Admin" ? (
                <Redirect to="/admin" />
              ) : (
                <Redirect to="/" />
              )
            ) : (
              <SignInAndSignUpPage />
            )
          }
        />
      </Switch>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(App);
