import { useState } from "react";
import { useDispatch } from "react-redux";

import jwtDecode from "jwt-decode";

import { withStyles } from "@material-ui/styles";
import {
  Button,
  IconButton,
  TextField,
  InputAdornment,
} from "@material-ui/core";

import { Visibility, VisibilityOff } from "@material-ui/icons";

import { setCurrentUser } from "../../redux/user/user.actions";

import userApi from "../../api/user-api";

import "./sign-in.styles.scss";
import { toggleNotification } from "../../redux/modal/modal.actions";
import { Link } from "react-router-dom";

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

const SignIn = ({ setAction }) => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const [errors, setErrors] = useState({});

  const { email, password, showPassword } = userInfo;

  const dispatch = useDispatch();

  const validate = (fieldValues = userInfo) => {
    let temp = { ...errors };
    if ("email" in fieldValues)
      temp.email = fieldValues.email ? "" : "This field is required";
    if ("password" in fieldValues)
      temp.password = fieldValues.password ? "" : "This field is required";

    setErrors({ ...temp });

    return Object.values(temp).every((x) => x === "");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUserInfo({ ...userInfo, [name]: value });
    validate({ [name]: value });
  };

  const handleSignUp = () => {
    setAction(false);
  };

  const handleShowPassword = () => {
    setUserInfo({ ...userInfo, showPassword: !showPassword });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validate()) {
      const payload = {
        username: email,
        password: password,
      };
      const signIn = async () => {
        try {
          const response = await userApi.authenticate(payload);
          localStorage.setItem("jwtToken", response);
          const user = jwtDecode(response);
          dispatch(setCurrentUser(user));
          dispatch(toggleNotification());
        } catch (error) {
          if (error.response?.data === "Incorrect Username.") {
            setErrors({
              email: "Your username is incorrect",
            });
          } else if (error.response?.data === "Incorrect Password.") {
            setErrors({
              password: "Your password is incorrect",
            });
          }
        }
      };
      signIn();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="sign-form">
        <div className="sign-title">Sign in with your email and password</div>
        <div className="sign-input">
          <CssTextField
            fullWidth
            {...(errors.email && {
              error: true,
              helperText: errors.email,
            })}
            name="email"
            value={email}
            onChange={handleChange}
            label="Username or Email"
          />
        </div>
        <div className="sign-input">
          <CssTextField
            {...(errors.password && {
              error: true,
              helperText: errors.password,
            })}
            fullWidth
            name="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handleChange}
            label="Password"
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
        <div className="sign-button">
          <Button type="submit" fullWidth variant="contained" color="secondary">
            Sign in
          </Button>
        </div>
        <div className="sign-text">
          <Link to="/forgotPassword">Forgot password?</Link>
        </div>
        <div className="sign-text-sign-up">
          <p>Don't have an account?</p>
          <p onClick={handleSignUp} className="sign-link">
            Sign Up
          </p>
        </div>
      </div>
    </form>
  );
};

export default SignIn;
