import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import DateFnsUtils from "@date-io/date-fns";
import { Button, TextField } from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

import Notification from "../notification/notification.component";

import { setCurrentUser } from "../../redux/user/user.actions";

import userApi from "../../api/user-api";

import "./profile-form.styles.scss";

const defaultImg = "/img/default-img.png";

const ProfileForm = ({ values, setValues }) => {
  const [errors, setErrors] = useState({});
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    avatar,
    avatarFile,
    firstName,
    lastName,
    dob,
    email,
    phoneNumber,
    address,
    emailConfirmed,
  } = values;

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("firstName" in fieldValues)
      temp.firstName = fieldValues.firstName ? "" : "This field is required";
    if ("lastName" in fieldValues)
      temp.lastName = fieldValues.lastName ? "" : "This field is required";
    if ("dob" in fieldValues) {
      temp.dob = fieldValues.dob ? "" : "This field is required";
      if (fieldValues.dob) {
        temp.dob =
          /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/.test(
            formatDate(new Date(fieldValues.dob))
          )
            ? ""
            : "Invalid Date Format";
      }
    }

    if ("email" in fieldValues) {
      temp.email = fieldValues.email ? "" : "This field is required.";
      if (fieldValues.email)
        temp.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fieldValues.email)
          ? ""
          : "Email is not valid.";
    }
    if ("phoneNumber" in fieldValues)
      temp.phoneNumber =
        fieldValues.phoneNumber?.length > 9
          ? ""
          : "Minimum 10 numbers required";
    if ("address" in fieldValues)
      temp.address = fieldValues.address ? "" : "This field is required";

    setErrors({ ...temp });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setValues({ ...values, [name]: value });
    validate({ [name]: value });
  };

  const formatDate = (date) => {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");

    return month + "/" + day + "/" + year;
  };

  const signOut = () => {
    dispatch(setCurrentUser(null));
    localStorage.removeItem("jwtToken");
    history.push("/signin");
  };

  const handleDateChange = (date) => {
    setValues({ ...values, dob: date });
    validate({ dob: date });
  };

  function isFileImage(file) {
    const acceptedImageTypes = [
      "image/gif",
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    return file && acceptedImageTypes.includes(file["type"]);
  }

  const handleReview = (event) => {
    if (event.target.files && event.target.files[0]) {
      let imageFile = event.target.files[0];
      if (!isFileImage(imageFile)) {
        setNotify({
          isOpen: true,
          message: "Please select image file",
          type: "warning",
        });
      } else {
        const reader = new FileReader();
        reader.onload = (x) => {
          setValues({
            ...values,
            avatarFile: imageFile,
            avatar: x.target.result,
          });
        };
        reader.readAsDataURL(imageFile);
      }
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
      formData.append("username", currentUser?.unique_name);
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("dob", formatDate(new Date(dob)));
      formData.append("phoneNumber", phoneNumber);
      formData.append("address", address);
      formData.append("email", email);
      formData.append("avatar", avatarFile);

      const editUserProfile = async () => {
        try {
          const response = await userApi.editProfile(formData);
          if (response.status === 200 && response.statusText === "OK") {
            setNotify({
              isOpen: true,
              message: "Edit profile successfully! Please sign in again",
              type: "success",
            });
          }
          if (emailConfirmed === false) {
            setTimeout(() => signOut(), 3000);
          }
        } catch (error) {
          if (error?.response.data === "Email already in user.") {
            setNotify({
              isOpen: true,
              message: "Email has been used! Try another!",
              type: "error",
            });
          } else {
            setNotify({
              isOpen: true,
              message: "Edit profile fail!",
              type: "error",
            });
          }
        }
      };

      editUserProfile();
    } else {
      setNotify({
        isOpen: true,
        message: "Invalid information! Please check the form",
        type: "warning",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="profile-user-info">
        <h2 className="profile-title">User Profile</h2>
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
              <Button color="primary" variant="contained" component="span">
                Upload
              </Button>
            </label>
          </div>
        </div>
        <div className="profile-field">
          <div className="profile-info">Username</div>
          <div className="profile-value">
            {currentUser ? currentUser.unique_name : ""}
          </div>
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
                placeholder="dd/MM/yyyy"
                name="dob"
                openTo="year"
                format="dd/MM/yyyy"
                label="Date of birth"
                views={["year", "month", "date"]}
                value={dob}
                onChange={(date) => handleDateChange(date)}
                {...(errors.dob && {
                  error: true,
                  helperText: errors.dob,
                })}
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
            color="primary"
            type="submit"
            className="profile-button-submit"
            variant="contained"
          >
            Save Change
          </Button>
        </div>
      </div>
      <Notification notify={notify} setNotify={setNotify} />
    </form>
  );
};

export default ProfileForm;
