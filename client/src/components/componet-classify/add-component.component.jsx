import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../../redux/modal/modal.actions";
import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";

const AddComponent = ({ item }) => {
  const initialFieldValues = {
    componentId: "0",
    componentName: "",
  };

  if (item.id !== undefined && item.name !== undefined) {
    initialFieldValues.componentId = item.Id;
    initialFieldValues.componentName = item.name;
  }
  let url = "";
  let config = null;

  const currentUser = useSelector((state) => state.user.currentUser);
  if (currentUser !== null) {
    if (currentUser.role === "Admin") {
      url = "http://localhost:5000/api/Admins/category/form";
      config = {
        headers: {
          Authorization: "Bearer " + currentUser.jwtToken,
        },
      };
    }
  }
  const [values, setValues] = useState(initialFieldValues);
  const { componentId, componentName } = values;

  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues({ ...values, [name]: value });
  };

  const data = {
    componentId,
    componentName,
  };

  const addCompoAPI = async () => {
    try {
      const response = await axios.post(url, data, config);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    //addDirectoryAPI();
    dispatch(toggleModal());
  };

  console.log("add-compo has re rendered");
  console.log(item);
  return (
    <form onSubmit={handleSubmit}>
      Component
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
