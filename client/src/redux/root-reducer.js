import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./user/user.reducer";
import modalReducer from "./modal/modal.reducer";
import directoryReducer from "./directory/directory.reducer";
import orderReducer from "./order/order.reducer";
import cartReducer from "./cart/cart.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "directories"],
};

const rootReducer = combineReducers({
  user: userReducer,
  modal: modalReducer,
  directories: directoryReducer,
  order: orderReducer,
  cart: cartReducer,
});

export default persistReducer(persistConfig, rootReducer);
