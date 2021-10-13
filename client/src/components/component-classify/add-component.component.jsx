import { useState } from "react";
import { useDispatch } from "react-redux";

import adminApi from "../../api/admin-api";

import {
  toggleModal,
  toggleNotification,
} from "../../redux/modal/modal.actions";
import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";

const AddComponent = ({ item }) => {
  const initialFieldValues = {
    componentId: 0,
    componentName: "",
  };

  if (item.id !== undefined && item.name !== undefined) {
    initialFieldValues.componentId = item.id;
    initialFieldValues.componentName = item.name;
  }

  const [values, setValues] = useState(initialFieldValues);
  const { componentId, componentName } = values;

  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const payload = {
      id: componentId,
      name: componentName,
    };
    if (item.id === undefined) {
      const addComponent = async () => {
        try {
          const response = await adminApi.addComponent(payload);
          console.log(response);
          dispatch(toggleNotification());
        } catch (error) {
          console.log("Fail to add component: ", error);
        }
      };

      addComponent();
    } else {
      const editComponent = async () => {
        try {
          const response = await adminApi.editComponent(payload);
          console.log(response);
          dispatch(toggleNotification());
        } catch (error) {
          console.log("Fail to add component: ", error);
        }
      };

      editComponent();
    }
    dispatch(toggleModal());
  };

  console.log("add-compo has re rendered");
  return (
    <form onSubmit={handleSubmit}>
      <h3>Component</h3>
      <FormInput
        type="text"
        name="componentName"
        handleChange={handleChange}
        value={componentName}
        label="Name"
        required
      />
      <div>
        <CustomButton type="submit">Submit</CustomButton>
      </div>
    </form>
  );
};

export default AddComponent;
