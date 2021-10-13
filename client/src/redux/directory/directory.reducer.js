import { DirectoryActionTypes } from "./directory.types";

const INITIAL_STATE = {
  directoryList: [],
};

const directoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DirectoryActionTypes.SET_DIRECTORY_LIST:
      return {
        ...state,
        directoryList: action.payload,
      };
    default:
      return state;
  }
};

export default directoryReducer;
