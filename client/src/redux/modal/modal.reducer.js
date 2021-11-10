import { ModalActionTypes } from "./modal.types";

const INITIAL_STATE = {
  isOpen: false,
  notification: null,
};

const modalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ModalActionTypes.TOGGLE_MODAL:
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    case ModalActionTypes.TOGGLE_NOTIFICATION:
      return {
        ...state,
        notification: action.payload,
      };
    default:
      return state;
  }
};

export default modalReducer;
