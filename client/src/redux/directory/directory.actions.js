import { DirectoryActionTypes } from "./directory.types";

export const setDirectoryList = (directoryList) => ({
  type: DirectoryActionTypes.SET_DIRECTORY_LIST,
  payload: directoryList,
});
