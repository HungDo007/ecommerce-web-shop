import { useHistory } from "react-router";
import "./menu-item.styles.scss";

const MenuItem = ({ name, image }) => {
  const history = useHistory();

  const ToDirectory = () => {
    //history.push(`directory/${name}`);
  };

  return (
    <div className="menu-item" onClick={ToDirectory}>
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${process.env.REACT_APP_IMAGE_URL + image})`,
        }}
      />
      <div className="content">
        <h1 className="title">{name.toUpperCase()}</h1>
      </div>
    </div>
  );
};

export default MenuItem;
