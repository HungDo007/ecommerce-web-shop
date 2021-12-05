import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Button, TextField } from "@material-ui/core";

import Notification from "../notification/notification.component";

import storeApi from "../../api/store-api";

import "./store-profile.styles.scss";
const defaultImg = "/img/default-img.png";

const StoreProfile = ({ match }) => {
  const storeInfo = {
    nameStore: "",
    phoneNumber: "",
    address: "",
    description: "",
    avatar: defaultImg,
    imageFile: null,
    rate: undefined,
    totalProduct: 0,
  };

  const [values, setValues] = useState(storeInfo);
  const [errors, setErrors] = useState({});
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const currentUser = useSelector((state) => state.user.currentUser);

  const { nameStore, phoneNumber, address, description, avatar, imageFile } =
    values;

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("nameStore" in fieldValues)
      temp.nameStore = fieldValues.nameStore ? "" : "This field is required";
    if ("phoneNumber" in fieldValues) {
      temp.phoneNumber =
        fieldValues.phoneNumber.length > 9 ? "" : "Minimum 10 numbers required";
      if (fieldValues.phoneNumber)
        temp.phoneNumber =
          /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(
            fieldValues.phoneNumber
          )
            ? ""
            : "Phone Number is not valid.";
    }

    if ("address" in fieldValues)
      temp.address = fieldValues.address ? "" : "This field is required";
    if ("description" in fieldValues)
      temp.description = fieldValues.description
        ? ""
        : "This field is required";

    setErrors({ ...temp });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues({ ...values, [name]: value });
    validate({ [name]: value });
  };

  const handleReview = (event) => {
    if (event.target.files && event.target.files[0]) {
      let imageFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setValues({
          ...values,
          imageFile,
          avatar: x.target.result,
        });
      };
      reader.readAsDataURL(imageFile);
    } else {
      setValues({
        ...values,
        imageFile: null,
        avatar: defaultImg,
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validate()) {
      const formData = new FormData();
      formData.append("username", currentUser.unique_name);
      formData.append("nameStore", nameStore);
      formData.append("description", description);
      formData.append("address", address);
      formData.append("phoneNumber", phoneNumber);
      formData.append("avatar", imageFile);

      const editStoreProfile = async () => {
        try {
          const response = await storeApi.editProfile(formData);
          console.log(response);
          if (response.status === 200 && response.statusText === "OK") {
            setNotify({
              isOpen: true,
              message: "Edit store profile successfully!",
              type: "success",
            });
          }
        } catch (error) {
          console.log("Failed to edit profile: ", error.response);
          setNotify({
            isOpen: true,
            message: "Failed to edit profile!",
            type: "error",
          });
        }
      };

      editStoreProfile();
    }
  };

  useEffect(() => {
    const getStoreProfile = async () => {
      try {
        const response = await storeApi.getProfile(currentUser.unique_name);
        setValues({
          address: response.address,
          avatar: response.avatar
            ? process.env.REACT_APP_IMAGE_URL + response.avatar
            : avatar,
          description: response.description,
          nameStore: response.nameStore,
          phoneNumber: response.phoneNumber,
          rate: response.rate,
          totalProduct: response.totalProduct,
        });
      } catch (error) {
        console.log("Failed to get store profile: ", error?.response);
      }
    };

    getStoreProfile();
  }, []);

  return (
    <form onSubmit={handleSubmit} className="store-container">
      <h3 className="store-main-title">Store Profile</h3>
      <div className="store-box">
        <div className="store-content-left">
          <img
            className="store-image"
            src={avatar ? avatar : defaultImg}
            alt="store"
          />
          <input
            id="raised-label-file"
            hidden
            type="file"
            accept="image/*"
            onChange={handleReview}
          />
          <label className="store-image-label" htmlFor="raised-label-file">
            Choose Image
          </label>
          <div className="store-links">
            <div className="store-link">
              <Link to={`${match.path}/manageProduct`}>Product</Link>
            </div>
            <div className="store-link">
              <Link to="/allProduct">Purchase order</Link>
            </div>
            <div className="store-link">
              <Link to="/allProduct">Statistic</Link>{" "}
            </div>
          </div>
        </div>
        <div className="store-info">
          <span className="store-title">Store Name</span>
          <TextField
            fullWidth
            name="nameStore"
            type="text"
            variant="outlined"
            value={nameStore}
            onChange={handleChange}
            {...(errors.nameStore && {
              error: true,
              helperText: errors.nameStore,
            })}
          />
          <span className="store-title">Phone Number</span>
          <TextField
            fullWidth
            name="phoneNumber"
            type="text"
            variant="outlined"
            value={phoneNumber}
            onChange={handleChange}
            {...(errors.phoneNumber && {
              error: true,
              helperText: errors.phoneNumber,
            })}
          />
          <span className="store-title">Address</span>
          <TextField
            fullWidth
            name="address"
            type="text"
            variant="outlined"
            value={address}
            onChange={handleChange}
            {...(errors.address && {
              error: true,
              helperText: errors.address,
            })}
          />
          <span className="store-title">Description</span>
          <TextField
            fullWidth
            multiline
            name="description"
            type="text"
            maxRows={5}
            minRows={5}
            variant="outlined"
            placeholder="Enter description or your store information here"
            value={description}
            onChange={handleChange}
            {...(errors.description && {
              error: true,
              helperText: errors.description,
            })}
          />
        </div>
      </div>
      <div className="store-button">
        <Button
          type="submit"
          variant="contained"
          className="store-button-submit"
        >
          Save Change
        </Button>
      </div>
      <Notification notify={notify} setNotify={setNotify} />
    </form>
  );
};

export default StoreProfile;
