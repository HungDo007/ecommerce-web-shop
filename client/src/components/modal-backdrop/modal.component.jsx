import "./modal.styles.scss";

const WithModal = (WrapComponent) => {
  const Modal = ({ ...otherProps }) => {
    return (
      <div className="modal">
        <div className="modal-center">
          <WrapComponent {...otherProps} />
        </div>
      </div>
    );
  };
  return Modal;
};

export default WithModal;
