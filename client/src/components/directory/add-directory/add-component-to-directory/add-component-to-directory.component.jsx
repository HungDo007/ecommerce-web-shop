import { useEffect, useState } from "react";

import { toggleModal } from "../../../../redux/modal/modal.actions";

import Checkbox from "../../../checkbox-item/checkbox-item.component";
import CustomButton from "../../../custom-button/custom-button.component";

import adminApi from "../../../../api/admin-api";

import "./add-component-to-directory.styles.scss";
import storeApi from "../../../../api/store-api";

const AddComponentToDirectory = ({ item, dispatch }) => {
  const [checkedState, setCheckedState] = useState([]);
  const [compoOfDirect, setCompoOfDirect] = useState([]);
  const [componentList, setComponentList] = useState([]);
  useEffect(() => {
    const fetchComponentList = async () => {
      try {
        const response = await adminApi.getAllComponent();
        setComponentList(response);
        setCheckedState(new Array(response.length).fill(false));
      } catch (error) {
        console.log("Failed to fetch component list: ", error);
      }
    };

    const fetchComponentOfDirectory = async () => {
      try {
        const response = await storeApi.getComponentOfDirectory(item.direcId);
        setCompoOfDirect(response);
      } catch (error) {
        console.log("Failed to fetch component of directory: ", error);
      }
    };

    fetchComponentList();
    fetchComponentOfDirectory();
  }, []);

  useEffect(() => {
    if (componentList.length !== 0 && compoOfDirect.length !== 0) {
      const arr = componentList.map((item) => {
        if (compoOfDirect.some((e) => e.id === item.id)) {
          return true;
        }
        return false;
      });

      setCheckedState(arr);
    }
  }, [componentList, compoOfDirect]);

  const [listCompoId, setListCompoId] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      catId: item.direcId,
      comps: listCompoId,
    };

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
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);

    const listCheckedCompo = updatedCheckedState.reduce(
      (emptyArray, currentState, index) => {
        if (currentState === true) {
          emptyArray.push(componentList[index]);
        }
        return emptyArray;
      },
      []
    );

    const listCompoId = listCheckedCompo.map((item) => item.id);
    setListCompoId(listCompoId);
  };

  console.log("add-component-to-directory has re rendered");
  return (
    <form onSubmit={handleSubmit}>
      <h3 className="add-component-to-directory-title">Add Component</h3>
      <div className="add-component-to-directory-container">
        {componentList.map((item, index) => (
          <Checkbox
            item={item}
            onChange={() => handleOnChange(index)}
            checked={checkedState[index] || false}
          />
        ))}
      </div>
      <CustomButton>Submit</CustomButton>
    </form>
  );
};

export default AddComponentToDirectory;
