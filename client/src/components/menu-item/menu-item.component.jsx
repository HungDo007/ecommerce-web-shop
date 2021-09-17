import { useHistory } from "react-router";
import "./menu-item.styles.scss";

const MenuItem = ({ title, imageUrl }) => {
  const history = useHistory();
  const ToDirectory = () => {
    history.push(`directory/${title}`);
  };
  return (
    <div className="menu-item" onClick={ToDirectory}>
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="content">
        <h1 className="title">{title.toUpperCase()}</h1>
      </div>
    </div>
  );
};

export default MenuItem;
