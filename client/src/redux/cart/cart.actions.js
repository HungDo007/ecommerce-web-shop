import { CartActionTypes } from "./cart.types";

export const setCartItems = (cart) => ({
  type: CartActionTypes.SET_CART,
  payload: cart,
});
