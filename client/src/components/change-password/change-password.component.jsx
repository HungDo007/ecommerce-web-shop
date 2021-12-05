import { useState } from "react";

import {
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from "@material-ui/core";

import { Visibility, VisibilityOff } from "@material-ui/icons";

const ChangePassword = () => {
  const [values, setValues] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    showPassword: false,
  });

  const [errors, setErrors] = useState({});

  const { oldPassword, newPassword, confirmPassword, showPassword } = values;

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("oldPassword" in fieldValues) {
      temp.oldPassword = fieldValues.oldPassword
        ? ""
        : "This field is required";

      if (fieldValues.oldPassword) {
        temp.oldPassword = /^(?=.*\d).{8,}$/.test(fieldValues.oldPassword)
          ? ""
          : "Password has at least 8 character";
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
      console.log(values);
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
          <div div className="profile-value">
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
          <div div className="profile-value">
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
    </form>
  );
};

export default ChangePassword;
