import { combineReducers } from "redux";

import userReducer from "./user/user.reducer";
import modalReducer from "./modal/modal.reducer";

export default combineReducers({
  user: userReducer,
  modal: modalReducer,
});
