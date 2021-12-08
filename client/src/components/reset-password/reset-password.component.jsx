import { useState } from "react";
import { useLocation } from "react-router";

import { withStyles } from "@material-ui/styles";
import {
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

import Notification from "../notification/notification.component";
import userApi from "../../api/user-api";

const background = "./img/background.jpg";

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "white",
    },
    "& label": {
      color: "white",
    },
    "& .MuiInputBase-root": {
      color: "white",
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "white",
    },
    "& label.Mui-error": {
      color: "red",
    },
    "& .MuiInput-underline.Mui-error:after": {
      borderBottomColor: "red",
    },
  },
})(TextField);

const ResetPassword = () => {
  const [values, setValues] = useState({
    newPassword: "",
    confirmPassword: "",
    showPassword: false,
  });

  const { newPassword, confirmPassword, showPassword } = values;

  const [errors, setErrors] = useState({});

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const token = query.get("token");
  const email = query.get("email");

  const validate = (fieldValues = values) => {
    let temp = { ...errors };

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
      const payload = {
        newPassword,
        email,
        token: token ? token.replace(/\s/g, "+") : "",
      };

      const resetPassword = async () => {
        try {
          const response = await userApi.resetPassword(payload);
          if (response.status === 200 && response.statusText === "OK") {
            setNotify({
              isOpen: true,
              message: "Reset password successfully!",
              type: "success",
            });
          }
        } catch (error) {
          setNotify({
            isOpen: true,
            message: "Some thing went wrong!",
            type: "error",
          });
        }
      };

      resetPassword();
    }
  };

  return (
    <form className="sign-block" onSubmit={handleSubmit}>
      <div
        style={{ backgroundImage: `url(${background})` }}
        className="background-image"
      >
        <div className="sign-form">
          <h2 className="sign-title">Enter your new password</h2>
          <div className="sign-input">
            <CssTextField
              fullWidth
              name="newPassword"
              label="New Password"
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
          <div className="sign-input">
            <CssTextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
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
          <div>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="secondary"
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
      <Notification notify={notify} setNotify={setNotify} />
    </form>
  );
};

export default ResetPassword;
