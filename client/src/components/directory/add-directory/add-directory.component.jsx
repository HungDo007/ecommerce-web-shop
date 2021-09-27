import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toggleModal } from "../../../redux/modal/modal.actions";
import CustomButton from "../../custom-button/custom-button.component";
import FormInput from "../../form-input/form-input.component";
import "./add-directory.styles.scss";
const defaultImg = "/img/default-img.png";

const AddDirectory = ({ item }) => {
  const initialFieldValues = {
    directoryId: "0",
    directoryName: "",
    imageSrc: defaultImg,
    imageFile: null,
  };

  if (
    item.id !== undefined &&
    item.title !== undefined &&
    item.imageUrl !== undefined
  ) {
    initialFieldValues.directoryId = item.Id;
    initialFieldValues.directoryName = item.title;
    initialFieldValues.imageSrc = item.imageUrl;
  }
  let url = "";
  let config = null;

  const currentUser = useSelector((state) => state.user.currentUser);
  if (currentUser !== null) {
    if (currentUser.role === "Admin") {
      url = "http://localhost:5000/api/Admins/category";
      config = {
        headers: {
          Authorization: "Bearer " + currentUser.jwtToken,
        },
      };
    }
  }
  const [values, setValues] = useState(initialFieldValues);
  const { directoryId, directoryName, imageSrc, imageFile } = values;

  const data = {
    name: directoryName,
    image: imageFile,
  };

  const formData = new FormData();
  formData.append("name", directoryName);
  formData.append("image", imageFile);

  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues({ ...values, [name]: value });
  };

  const handleConfirm = () => {
    dispatch(toggleModal(true));
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

  const addDirectoryAPI = async () => {
    try {
      const response = await axios.post(url, formData, config);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addDirectoryAPI();
    // const formData = new FormData();
    // formData.append("directoryName", directoryName);
    // formData.append("imageFile", imageFile);
  };

  console.log("add-directory has re rendered");
  return (
    <form onSubmit={handleSubmit}>
      Directory
      <div>
        <img className="image" src={imageSrc} />
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
