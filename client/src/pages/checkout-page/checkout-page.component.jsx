import { Route, Switch } from "react-router";

import Checkout from "../../components/checkout/checkout.component";
import CheckoutSuccess from "../../components/checkout/checkout-success.component";
import CheckoutFailed from "../../components/checkout/checkout-failed.component";

const CheckoutPage = ({ match }) => {
  return (
    <div>
      <Switch>
        <Route exact path={match.path} component={Checkout} />
        <Route
          path={`${match.path}/CheckoutSuccess`}
          component={CheckoutSuccess}
        />
        <Route path={`${match.path}/CheckoutFail`} component={CheckoutFailed} />
      </Switch>
    </div>
  );
};

export default CheckoutPage;
