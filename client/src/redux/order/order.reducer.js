import { OrderActionTypes } from "./order.types";

const INITIAL_STATE = {
  orderItems: [],
};

const orderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OrderActionTypes.SET_ORDER_ITEMS:
      return {
        ...state,
        orderItems: action.payload,
      };

    default:
      return state;
  }
};

export default orderReducer;
