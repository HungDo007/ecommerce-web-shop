import { Route, Switch } from "react-router";

import Order from "../../components/order/order.component";
import OrderDetail from "../../components/order-detail/order-detail.component";

const OrderPage = ({ match }) => {
  return (
    <div>
      <Switch>
        <Route exact path={match.path} component={Order} />
        <Route path={`${match.path}/:orderId`} component={OrderDetail} />
      </Switch>
    </div>
  );
};

export default OrderPage;
