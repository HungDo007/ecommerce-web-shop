import MenuItem from "../menu-item/menu-item.component";

import { data } from "./data";

import "./directory.styles.scss";

const Directory = () => {
  return (
    <>
      <div className="directory-title">Directory</div>
      <div className="directory-menu">
        {data.sections.map(({ id, ...otherProps }) => (
          <MenuItem key={id} {...otherProps} />
        ))}
      </div>
    </>
  );
};

export default Directory;
