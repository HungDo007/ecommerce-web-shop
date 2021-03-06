import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import "./App.css";

import AdminPage from "./pages/admin-page/admin-page.component";
import CartPage from "./pages/cart-page/cart-page.component";
import DirectoryPage from "./pages/directory-page/directory-page.component";
import HomePage from "./pages/homepage/homepage.component";
import ProductPage from "./pages/product-page/product-page.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import StorePage from "./pages/store-page/store-page.component";
import OrderPage from "./pages/order-page/order-page.component";
import UserPage from "./pages/user-page/user-page.component";
import CheckoutPage from "./pages/checkout-page/checkout-page.component";

import Footer from "./components/footer/footer.component";
import Sidebar from "./components/sidebar/sidebar.component";
import ForgotPassword from "./components/reset-password/forgot-password.component";
import ResetPassword from "./components/reset-password/reset-password.component";
import UserRoute from "./components/route/user-route.component";
import ScrollToTop from "./components/route/scroll-to-top.component";
import NotFoundPage from "./pages/not-found-page/not-found.component";

const App = ({ currentUser }) => {
  return (
    <div>
      <Sidebar />
      <ScrollToTop />
      <Switch>
        <Route
          exact
          path="/"
          render={() =>
            currentUser?.role === "Admin" ? (
              <Redirect to="/Admin" />
            ) : (
              <HomePage />
            )
          }
        />
        <Route
          path="/admin"
          render={(props) =>
            currentUser ? (
              currentUser.role === "Admin" ? (
                <AdminPage {...props} />
              ) : (
                <Redirect to="/" />
              )
            ) : (
              <Redirect to="/signin" />
            )
          }
        />
        <Route path="/directory" component={DirectoryPage} />
        <Route path="/product" component={ProductPage} />
        <Route path="/forgotPassword" component={ForgotPassword} />
        <UserRoute
          path="/cart"
          currentUser={currentUser}
          component={CartPage}
        />
        <UserRoute
          path="/checkout"
          currentUser={currentUser}
          component={CheckoutPage}
        />
        <UserRoute
          path="/order"
          currentUser={currentUser}
          component={OrderPage}
        />
        <UserRoute
          path="/store"
          currentUser={currentUser}
          component={StorePage}
        />
        <UserRoute
          path="/user"
          currentUser={currentUser}
          component={UserPage}
        />
        <Route path="/ResetPassword" component={ResetPassword} />
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
        <Route path="*" component={NotFoundPage} />
      </Switch>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(App);
