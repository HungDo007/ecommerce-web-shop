import { useState } from "react";
import { useSelector } from "react-redux";

import DateFnsUtils from "@date-io/date-fns";
import { Button, TextField } from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

import userApi from "../../api/user-api";

import "./profile-form.styles.scss";

const defaultImg = "/img/default-img.png";

const ProfileForm = ({ values, setValues }) => {
  const [errors, setErrors] = useState({});

  const currentUser = useSelector((state) => state.user.currentUser);

  const {
    avatar,
    avatarFile,
    firstName,
    lastName,
    dob,
    email,
    phoneNumber,
    address,
  } = values;

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("firstName" in fieldValues)
      temp.firstName = fieldValues.firstName ? "" : "This field is required";
    if ("lastName" in fieldValues)
      temp.lastName = fieldValues.lastName ? "" : "This field is required";
    if ("email" in fieldValues) {
      temp.email = fieldValues.email ? "" : "This field is required.";
      if (fieldValues.email)
        temp.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fieldValues.email)
          ? ""
          : "Email is not valid.";
    }
    if ("phoneNumber" in fieldValues)
      temp.phoneNumber =
        fieldValues.phoneNumber.length > 9 ? "" : "Minimum 10 numbers required";
    if ("address" in fieldValues)
      temp.address = fieldValues.address ? "" : "This field is required";

    setErrors({ ...temp });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setValues({ ...values, [name]: value });
    validate({ [name]: value });
  };

  const handleDateChange = (date) => {
    setValues({ ...values, dob: date });
  };

  const handleReview = (event) => {
    if (event.target.files && event.target.files[0]) {
      let imageFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setValues({
          ...values,
          avatarFile: imageFile,
          avatar: x.target.result,
        });
      };
      reader.readAsDataURL(imageFile);
    } else {
      setValues({
        ...values,
        avatarFile: null,
        avatar: defaultImg,
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validate()) {
      const formData = new FormData();
      formData.append("username", currentUser.unique_name);
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("dob", dob);
      formData.append("phoneNumber", phoneNumber);
      formData.append("address", address);
      formData.append("email", email);
      formData.append("avatar", avatarFile);

      const editUserProfile = async () => {
        try {
          const response = await userApi.editProfile(formData);
          console.log(response);
        } catch (error) {
          console.log("Failed to edit profile: ", error);
        }
      };

      editUserProfile();
    }
  };

  console.log("profile form has re rendered");

  return (
    <form className="profile-block" onSubmit={handleSubmit}>
      <div className="profile-user-info">
        <h2>User Profile</h2>
        <div className="profile-user-avatar">
          <div>
            <img
              className="profile-user-avatar-image"
              src={avatar ? avatar : defaultImg}
              alt="store"
            />
          </div>
          <div>
            <input
              id="raised-button-file"
              hidden
              type="file"
              accept="image/*"
              onChange={handleReview}
            />
            <label className="profile-button" htmlFor="raised-button-file">
              <Button
                className="profile-button-submit"
                variant="contained"
                component="span"
              >
                Upload
              </Button>
            </label>
          </div>
        </div>
        <div className="profile-field">
          <div className="profile-info">Username</div>
          <div className="profile-value">{currentUser.unique_name}</div>
        </div>
        <div className="profile-field">
          <div className="profile-info">First Name</div>
          <div className="profile-value">
            <TextField
              name="firstName"
              value={firstName}
              variant="outlined"
              fullWidth
              onChange={handleInputChange}
              {...(errors.firstName && {
                error: true,
                helperText: errors.firstName,
              })}
            />
          </div>
        </div>
        <div className="profile-field">
          <div className="profile-info">Last Name</div>
          <div className="profile-value">
            <TextField
              name="lastName"
              value={lastName}
              variant="outlined"
              fullWidth
              onChange={handleInputChange}
              {...(errors.lastName && {
                error: true,
                helperText: errors.lastName,
              })}
            />
          </div>
        </div>
        <div className="profile-field">
          <div className="profile-info">Date Of Birth</div>
          <div className="profile-value">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableFuture
                fullWidth
                name="dob"
                openTo="year"
                format="dd/MM/yyyy"
                label="Date of birth"
                views={["year", "month", "date"]}
                value={dob}
                onChange={(date) => handleDateChange(date)}
              />
            </MuiPickersUtilsProvider>
          </div>
        </div>
        <div className="profile-field">
          <div className="profile-info">Email</div>
          <div className="profile-value">
            <TextField
              name="email"
              value={email}
              variant="outlined"
              fullWidth
              onChange={handleInputChange}
              {...(errors.email && {
                error: true,
                helperText: errors.email,
              })}
            />
          </div>
        </div>
        <div className="profile-field">
          <div className="profile-info">Phone Number</div>
          <div className="profile-value">
            <TextField
              name="phoneNumber"
              value={phoneNumber}
              variant="outlined"
              fullWidth
              onChange={handleInputChange}
              {...(errors.phoneNumber && {
                error: true,
                helperText: errors.phoneNumber,
              })}
            />
          </div>
        </div>
        <div className="profile-field">
          <div className="profile-info">Address</div>
          <div className="profile-value">
            <TextField
              fullWidth
              multiline
              minRows={4}
              name="address"
              value={address}
              variant="outlined"
              onChange={handleInputChange}
              {...(errors.address && {
                error: true,
                helperText: errors.address,
              })}
            />
          </div>
        </div>
        <div className="profile-button">
          <Button
            type="submit"
            className="profile-button-submit"
            variant="contained"
          >
            Save Change
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ProfileForm;