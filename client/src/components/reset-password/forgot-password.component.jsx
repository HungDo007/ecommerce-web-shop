import { useState } from "react";

import { withStyles } from "@material-ui/styles";
import { TextField, Button } from "@material-ui/core";

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

const ForgotPassword = () => {
  const [state, setState] = useState({
    email: "",
  });

  const [errors, setErrors] = useState({});

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const validate = (fieldValues = state) => {
    let temp = { ...errors };
    if ("email" in fieldValues) {
      temp.email = fieldValues.email ? "" : "This field is required";
      if (fieldValues.email)
        temp.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fieldValues.email)
          ? ""
          : "Email is not valid.";
    }

    setErrors({ ...temp });

    if (fieldValues === state) {
      return Object.values(temp).every((x) => x === "");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setState({ ...state, [name]: value });
    validate({ [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validate()) {
      const requestResetPassword = async () => {
        try {
          const response = await userApi.requestResetPassword(state.email);
          if (response.status === 200 && response.statusText === "OK") {
            setNotify({
              isOpen: true,
              message: "Success ! Please check your email",
              type: "success",
            });
          }
        } catch (error) {
          if (
            error?.response.status === 400 &&
            error?.response.data === "Incorrect Email"
          ) {
            setErrors({ email: "Email is not exist" });
          }
        }
      };
      requestResetPassword();
    }
  };

  return (
    <form className="sign-block" onSubmit={handleSubmit}>
      <div
        style={{ backgroundImage: `url(${background})` }}
        className="background-image"
      >
        <div className="sign-form">
          <h2 className="sign-title">Enter your email to reset password</h2>
          <div className="sign-input">
            <CssTextField
              name="email"
              value={state.email}
              onChange={handleChange}
              fullWidth
              label="Email"
              {...(errors.email && {
                error: true,
                helperText: errors.email,
              })}
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

export default ForgotPassword;
