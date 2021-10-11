import { ModalActionTypes } from "./modal.types";

export const toggleModal = () => ({
  type: ModalActionTypes.TOGGLE_MODAL,
});

export const toggleNotification = () => ({
  type: ModalActionTypes.TOGGLE_NOTIFICATION,
});
