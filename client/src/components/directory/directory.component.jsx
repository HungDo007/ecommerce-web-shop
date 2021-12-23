import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setDirectoryList } from "../../redux/directory/directory.actions";

import MenuItem from "../menu-item/menu-item.component";

import catalogApi from "../../api/catalog-api";

import "./directory.styles.scss";

const Directory = () => {
  const directoryList = useSelector((state) => state.directories.directoryList);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchDirectoryList = async () => {
      try {
        const response = await catalogApi.getAllDirectory();
        if (response?.status !== 204) {
          dispatch(setDirectoryList(response));
        }
      } catch (error) {}
    };

    fetchDirectoryList();
  }, [dispatch]);

  return (
    <>
      <div className="directory-title">Directory</div>
      <div className="directory-menu">
        {directoryList.map(({ id, ...otherProps }) => (
          <MenuItem key={id} id={id} {...otherProps} />
        ))}
      </div>
    </>
  );
};

export default Directory;
