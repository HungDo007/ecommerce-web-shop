import { ModalActionTypes } from "./modal.types";

export const toggleModal = () => ({
  type: ModalActionTypes.TOGGLE_MODAL,
});

export const toggleNotification = (notification) => ({
  type: ModalActionTypes.TOGGLE_NOTIFICATION,
  payload: notification,
});
