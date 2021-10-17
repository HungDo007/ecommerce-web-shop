import { useEffect, useState } from "react";

import { toggleModal } from "../../../../redux/modal/modal.actions";

import Checkbox from "../../../checkbox-item/checkbox-item.component";
import CustomButton from "../../../custom-button/custom-button.component";

import adminApi from "../../../../api/admin-api";

import "./add-component-to-directory.styles.scss";

const AddComponentToDirectory = ({ item, dispatch }) => {
  const [compoOfDirect, setCompoOfDirect] = useState([]);
  useEffect(() => {
    const fetchComponentOfDirectory = async () => {
      try {
        const response = await adminApi.getComponentOfDirectory(item.direcId);
        setCompoOfDirect(response);
      } catch (error) {
        console.log("Failed to fetch component of directory: ", error);
      }
    };

    fetchComponentOfDirectory();
  }, []);

  useEffect(() => {
    const ls = compoOfDirect
      .filter((item) => item.isExists === true)
      .map((item) => item.id);
    setListCompoId(ls);
  }, [compoOfDirect]);

  const [listCompoId, setListCompoId] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      catId: item.direcId,
      comps: listCompoId,
    };

    console.log(data);

    const addComponentToDirectory = async () => {
      try {
        const response = await adminApi.addComponentToDirectory(data);
        console.log(response);
      } catch (error) {
        console.log("Failed to add component to directory: ", error);
      }
    };

    addComponentToDirectory();
    dispatch(toggleModal());
  };

  const handleOnChange = (position) => {
    const newCompoOfDirect = [...compoOfDirect];

    newCompoOfDirect[position] = {
      ...newCompoOfDirect[position],
      isExists: !newCompoOfDirect[position].isExists,
    };
    setCompoOfDirect(newCompoOfDirect);
  };

  console.log("add-component-to-directory has re rendered");
  return (
    <form onSubmit={handleSubmit}>
      <h3 className="add-component-to-directory-title">Add Component</h3>
      <div className="add-component-to-directory-container">
        {compoOfDirect.map((item, index) => (
          <Checkbox
            key={item.id}
            item={item}
            onChange={() => handleOnChange(index)}
            checked={item.isExists}
          />
        ))}
      </div>
      <CustomButton>Submit</CustomButton>
    </form>
  );
};

export default AddComponentToDirectory;
