import { useState } from "react";

import {
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from "@material-ui/core";

import { Visibility, VisibilityOff } from "@material-ui/icons";

import Notification from "../notification/notification.component";
import { setCurrentUser } from "../../redux/user/user.actions";

import userApi from "../../api/user-api";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

const ChangePassword = () => {
  const [values, setValues] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    showPassword: false,
  });

  const [errors, setErrors] = useState({});

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const { oldPassword, newPassword, confirmPassword, showPassword } = values;

  const dispatch = useDispatch();
  const history = useHistory();

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("oldPassword" in fieldValues) {
      temp.oldPassword = fieldValues.oldPassword
        ? ""
        : "This field is required";

      if (fieldValues.oldPassword) {
        temp.oldPassword = /^(?=.*\d).{8,}$/.test(fieldValues.oldPassword)
          ? ""
          : "Password has at least 8 character and number";
      }
    }

    if ("newPassword" in fieldValues) {
      temp.newPassword = fieldValues.newPassword
        ? ""
        : "This field is required";
      if (fieldValues.newPassword) {
        temp.newPassword =
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[0-9a-zA-Z!@#$%^&*]{8,}$/.test(
            fieldValues.newPassword
          )
            ? ""
            : "Password has at least 8 character with special character, number and uppercase character";
      }
    }

    if ("confirmPassword" in fieldValues) {
      temp.confirmPassword = fieldValues.confirmPassword
        ? ""
        : "This field is required";
      if (fieldValues.confirmPassword) {
        temp.confirmPassword =
          fieldValues.confirmPassword === newPassword
            ? ""
            : "Password doesn't match";
      }
    }

    setErrors({ ...temp });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x == "");
  };

  const signOut = () => {
    dispatch(setCurrentUser(null));
    localStorage.removeItem("jwtToken");
    history.push("/signin");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues({ ...values, [name]: value });
    validate({ [name]: value });
  };

  const handleShowPassword = () => {
    setValues({ ...values, showPassword: !showPassword });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validate()) {
      const payload = {
        oldPassword,
        newPassword,
      };
      const changePassword = async () => {
        try {
          const response = await userApi.changePassword(payload);
          if (response.status === 200 && response.statusText === "OK") {
            setNotify({
              isOpen: true,
              message: "Change password successfully! Please sign in again",
              type: "success",
            });

            setTimeout(() => signOut(), 3000);
          }
        } catch (error) {
          // console.log("Failed to change password: ", error?.response);
          if (error?.response.status === 400) {
            setErrors({ oldPassword: "Your password is incorrect" });
          }
        }
      };
      changePassword();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="profile-user-info">
        <div className="profile-field">
          <div className="profile-info">Old Password</div>
          <div className="profile-value">
            <TextField
              fullWidth
              name="oldPassword"
              variant="outlined"
              value={oldPassword}
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              {...(errors.oldPassword && {
                error: true,
                helperText: errors.oldPassword,
              })}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleShowPassword}
                      className="sign-button-pass"
                      aria-label="toggle password visibility"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </div>
        <div className="profile-field">
          <div className="profile-info">New Password</div>
          <div className="profile-value">
            <TextField
              fullWidth
              name="newPassword"
              variant="outlined"
              value={newPassword}
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              {...(errors.newPassword && {
                error: true,
                helperText: errors.newPassword,
              })}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleShowPassword}
                      className="sign-button-pass"
                      aria-label="toggle password visibility"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </div>
        <div className="profile-field">
          <div className="profile-info">Confirm Password</div>
          <div className="profile-value">
            <TextField
              fullWidth
              name="confirmPassword"
              variant="outlined"
              value={confirmPassword}
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              {...(errors.confirmPassword && {
                error: true,
                helperText: errors.confirmPassword,
              })}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleShowPassword}
                      className="sign-button-pass"
                      aria-label="toggle password visibility"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </div>
        <div className="profile-field">
          <Link to="/forgotPassword">Forgot Password?</Link>
        </div>
        <div className="profile-button">
          <Button
            type="submit"
            className="profile-button-submit"
            variant="contained"
          >
            Confirm
          </Button>
        </div>
      </div>
      <Notification notify={notify} setNotify={setNotify} />
    </form>
  );
};

export default ChangePassword;
