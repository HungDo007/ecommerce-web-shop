import { useDispatch } from "react-redux";
import { toggleModal } from "../../redux/modal/modal.actions";
import "./backdrop.styles.scss";

const Backdrop = () => {
  const dispatch = useDispatch();
  const handleCloseModal = () => {
    dispatch(toggleModal(false));
  };
  return <div className="backdrop" onClick={handleCloseModal}></div>;
};

export default Backdrop;
