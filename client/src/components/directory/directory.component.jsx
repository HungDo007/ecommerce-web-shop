import { useEffect } from "react";
import { useDispatch } from "react-redux";

import catalogApi from "../../api/catalog-api";

import MenuItem from "../menu-item/menu-item.component";

import { setDirectoryList } from "../../redux/directory/directory.actions";

import "./directory.styles.scss";
import { useSelector } from "react-redux";

const Directory = () => {
  const directoryList = useSelector((state) => state.directories.directoryList);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchDirectoryList = async () => {
      try {
        const response = await catalogApi.getAllDirectory();
        dispatch(setDirectoryList(response));
      } catch (error) {
        console.log("Failed to fetch directory list: ", error);
      }
    };

    fetchDirectoryList();
  }, []);
  return (
    <>
      <div className="directory-title">Directory</div>
      <div className="directory-menu">
        {directoryList.map(({ id, ...otherProps }) => (
          <MenuItem key={id} {...otherProps} />
        ))}
      </div>
    </>
  );
};

export default Directory;
