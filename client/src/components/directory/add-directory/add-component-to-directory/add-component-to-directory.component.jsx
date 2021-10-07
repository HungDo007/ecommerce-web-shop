import { useEffect, useState } from "react";
import Checkbox from "../../../checkbox-item/checkbox-item.component";
import CustomButton from "../../../custom-button/custom-button.component";
import adminApi from "../../../../api/admin-api";
import "./add-component-to-directory.styles.scss";

const AddComponentToDirectory = ({ item }) => {
  const [checkedState, setCheckedState] = useState([]);

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

    fetchComponentList();
  }, []);

  const [listCompoId, setListCompoId] = useState([]);

  const handleSubmit = () => {
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
    <div>
      <h3 className="add-component-to-directory-title">Add Component</h3>
      <div className="add-component-to-directory-container">
        {componentList.map((item, index) => (
          <Checkbox
            item={item}
            onChange={() => handleOnChange(index)}
            checked={checkedState[index]}
          />
        ))}
      </div>
      <div onClick={handleSubmit}>
        <CustomButton>Submit</CustomButton>
      </div>
    </div>
  );
};

export default AddComponentToDirectory;
