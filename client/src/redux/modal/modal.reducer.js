import { ModalActionTypes } from "./modal.types";

const INITIAL_STATE = {
  isOpen: false,
};

const modalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ModalActionTypes.TOGGLE_MODAL:
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    default:
      return state;
  }
};

export default modalReducer;
