import { useState } from "react";
import { useDispatch } from "react-redux";

import { withStyles } from "@material-ui/styles";
import {
  Button,
  TextField,
  IconButton,
  InputAdornment,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

import adminApi from "../../api/admin-api";
import userApi from "../../api/user-api";

import { toggleModal } from "../../redux/modal/modal.actions";

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

const SignUp = ({ setAction, currentUser }) => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
  });

  const [errors, setErrors] = useState({});

  const { username, email, password, confirmPassword, showPassword } = userInfo;

  const dispatch = useDispatch();

  const validate = (fieldValues = userInfo) => {
    let temp = { ...errors };
    if ("username" in fieldValues)
      temp.username = fieldValues.username ? "" : "This field is required";

    if ("email" in fieldValues) {
      temp.email = fieldValues.email ? "" : "This field is required.";
      if (fieldValues.email)
        temp.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fieldValues.email)
          ? ""
          : "Email is not valid.";
    }

    if ("password" in fieldValues)
      temp.password = fieldValues.password ? "" : "This field is required";

    if (fieldValues.password)
      temp.password =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[0-9a-zA-Z!@#$%^&*]{8,}$/.test(
          fieldValues.password
        )
          ? ""
          : "Password has at least 8 character with special character, number and uppercase character";

    if ("confirmPassword" in fieldValues) {
      temp.confirmPassword = fieldValues.confirmPassword
        ? ""
        : "This field is required";
    }

    setErrors({ ...temp });

    if (fieldValues == userInfo)
      return Object.values(temp).every((x) => x == "");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUserInfo({ ...userInfo, [name]: value });
    validate({ [name]: value });
  };

  const handleShowPassword = () => {
    setUserInfo({ ...userInfo, showPassword: !showPassword });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setErrors({ confirmPassword: "Password doesn't match" });
      return;
    }

    if (validate()) {
      const data = {
        userName: username,
        email: email,
        password: password,
      };

      if (currentUser) {
        if (currentUser.role === "Admin") {
          const addAdmin = async () => {
            try {
              const response = await adminApi.addAmin(data);
              console.log(response);
              dispatch(toggleModal());
            } catch (error) {
              console.log(error);
            }
          };
          addAdmin();
        }
      } else {
        const signUp = async () => {
          try {
            const response = await userApi.signUp(data);
            console.log(response);
          } catch (error) {
            console.log(error);
          }
        };
        signUp();
      }
    }
  };

  const handleSignIn = () => {
    setAction(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="sign-form">
        <div className="sign-title">Sign up with your email and password</div>
        <div className="sign-input">
          <CssTextField
            name="username"
            value={username}
            onChange={handleChange}
            fullWidth
            label="Username"
            {...(errors.username && {
              error: true,
              helperText: errors.username,
            })}
          />
        </div>
        <div className="sign-input">
          <CssTextField
            name="email"
            value={email}
            onChange={handleChange}
            fullWidth
            label="Email"
            {...(errors.email && {
              error: true,
              helperText: errors.email,
            })}
          />
        </div>
        <div className="sign-input">
          <CssTextField
            name="password"
            value={password}
            type={showPassword ? "text" : "password"}
            onChange={handleChange}
            fullWidth
            label="Password"
            {...(errors.password && {
              error: true,
              helperText: errors.password,
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
            name="confirmPassword"
            value={confirmPassword}
            type={showPassword ? "text" : "password"}
            onChange={handleChange}
            fullWidth
            label="Confirm Password"
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
        <div className="sign-button">
          <Button type="submit" fullWidth variant="contained" color="secondary">
            Sign up
          </Button>
        </div>
        <div className="sign-text">
          I agree all statements in Term of service
        </div>
        <div className="sign-text-sign-up">
          {currentUser ? (
            ""
          ) : (
            <>
              <p>Have an account?</p>
              <p onClick={handleSignIn} className="sign-link">
                Sign In
              </p>
            </>
          )}
        </div>
      </div>
    </form>
  );
};

export default SignUp;
