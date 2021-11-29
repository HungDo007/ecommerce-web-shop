import { OrderActionTypes } from "./order.types";

export const setOrderItems = (orderItems) => ({
  type: OrderActionTypes.SET_ORDER_ITEMS,
  payload: orderItems,
});
