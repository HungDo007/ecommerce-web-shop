import { useState } from "react";
import { useDispatch } from "react-redux";
import adminApi from "../../../api/admin-api";
import { toggleModal } from "../../../redux/modal/modal.actions";
import CustomButton from "../../custom-button/custom-button.component";
import FormInput from "../../form-input/form-input.component";
import "./add-directory.styles.scss";
const defaultImg = "/img/default-img.png";

const AddDirectory = ({ item }) => {
  const initialFieldValues = {
    directoryId: 0,
    directoryName: "",
    imageSrc: defaultImg,
    imageFile: null,
  };

  if (
    item.id !== undefined &&
    item.name !== undefined &&
    item.imageUrl !== undefined
  ) {
    initialFieldValues.directoryId = item.id;
    initialFieldValues.directoryName = item.name;
    initialFieldValues.imageSrc =
      process.env.REACT_APP_IMAGE_URL + item.imageUrl;
  }

  const [values, setValues] = useState(initialFieldValues);
  const { directoryId, directoryName, imageSrc, imageFile } = values;

  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues({ ...values, [name]: value });
  };

  const handleReview = (event) => {
    if (event.target.files && event.target.files[0]) {
      let imageFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setValues({
          ...values,
          imageFile,
          imageSrc: x.target.result,
        });
      };
      reader.readAsDataURL(imageFile);
    } else {
      setValues({
        ...values,
        imageFile: null,
        imageSrc: defaultImg,
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", directoryName);
    formData.append("image", imageFile);

    if (item.id === undefined) {
      const addDirectory = async () => {
        try {
          const response = await adminApi.addDirectory(formData);
          console.log(response);
        } catch (error) {
          console.log("Failed to add directory: ", error);
        }
      };

      addDirectory();
    } else {
      const editDirectory = async () => {
        try {
          const response = await adminApi.editDirectory(formData);
          console.log(response);
        } catch (error) {
          console.log("Failed to edit directory: ", error);
        }
      };
      editDirectory();
    }
    dispatch(toggleModal());
  };

  console.log("add-directory has re rendered");
  return (
    <form onSubmit={handleSubmit}>
      Directory
      <div>
        <img className="image" src={imageSrc} alt="directory" />
      </div>
      <div>
        <input type="file" accept="image/*" onChange={handleReview} required />
      </div>
      <FormInput
        type="text"
        name="directoryName"
        handleChange={handleChange}
        value={directoryName}
        label="Name"
        required
      />
      <div>
        <CustomButton type="submit">Submit</CustomButton>
      </div>
    </form>
  );
};

export default AddDirectory;
