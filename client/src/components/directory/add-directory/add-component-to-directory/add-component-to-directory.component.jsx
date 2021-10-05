import { useEffect, useState } from "react";
import Checkbox from "../../../checkbox-item/checkbox-item.component";
import CustomButton from "../../../custom-button/custom-button.component";
import adminApi from "../../../../api/admin-api";
import "./add-component-to-directory.styles.scss";

const AddComponentToDirectory = ({ item }) => {
  const listComponent = [
    {
      id: 11,
      name: "Color",
    },
    {
      id: 21,
      name: "Size",
    },
    {
      id: 31,
      name: "Ram",
    },
    {
      id: 41,
      name: "Rom",
    },
  ];

  const [componentList, setComponentList] = useState([]);
  useEffect(() => {
    const fetchComponentList = async () => {
      try {
        const response = await adminApi.getAllComponent();
        setComponentList(response);
      } catch (error) {
        console.log("Failed to fetch component list: ", error);
      }
    };

    fetchComponentList();
  }, []);

  const [checkedState, setCheckedState] = useState(
    new Array(listComponent.length).fill(false)
  );

  const [listCompoId, setListCompoId] = useState([]);

  const data = {
    directId: item.direcId,
    listComponent: listCompoId,
  };

  const handleSubmit = () => {
    console.log(data);
  };

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);

    const listCheckedCompo = updatedCheckedState.reduce(
      (emptyArray, currentState, index) => {
        if (currentState === true) {
          emptyArray.push(listComponent[index]);
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
