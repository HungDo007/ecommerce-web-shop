import "./backdrop.styles.scss";

const Backdrop = (props) => (
  <div className="backdrop" onClick={props.onClickCancel}></div>
);

export default Backdrop;
