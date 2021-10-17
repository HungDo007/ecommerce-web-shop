import { useState } from "react";
import jwtDecode from "jwt-decode";
import userApi from "../../api/user-api";

import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";

import { setCurrentUser } from "../../redux/user/user.actions";

import "./sign-in.styles.scss";
import Notification from "../notification/notification.component";
import { useDispatch } from "react-redux";

const SignIn = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const { email, password } = userInfo;
  const [showNotification, setNotification] = useState(false);

  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      username: email,
      password: password,
    };
    const signIn = async () => {
      try {
        const response = await userApi.authenticate(payload);
        localStorage.setItem("jwtToken", response);
        const user = jwtDecode(response);
        console.log(user);
        setNotification(true);
        setTimeout(() => {
          setNotification(false);
        }, 1000);
        setTimeout(() => {
          dispatch(setCurrentUser(user));
        }, 1005);
      } catch (error) {
        console.log("Fail to authenticate: ", error.response);
      }
    };
    signIn();
  };

  return (
    <div className="sign-in">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          name="email"
          handleChange={handleChange}
          value={email}
          label="Email or Username"
          required
        />
        <FormInput
          name="password"
          type="password"
          value={password}
          handleChange={handleChange}
          label="Password"
          required
        />
        <div className="buttons">
          <CustomButton type="submit"> Sign in </CustomButton>
          <CustomButton onClick={() => alert("Sign in with GG")} isGoogleSignIn>
            Google
          </CustomButton>
        </div>
      </form>
      {showNotification && <Notification message="Sign in successfully" />}
    </div>
  );
};

export default SignIn;
