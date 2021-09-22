import { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import jwtDecode from "jwt-decode";

import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";

import { setCurrentUser } from "../../redux/user/user.actions";

import "./sign-in.styles.scss";

const SignIn = ({ setCurrentUser }) => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const { email, password } = userInfo;

  const data = {
    username: email,
    password: password,
  };

  const signIn = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/Users/authenticate",
        data
      );
      const user = jwtDecode(response.data);
      user["jwtToken"] = response.data;
      //console.log(user);
      setCurrentUser(user);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
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
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(null, mapDispatchToProps)(SignIn);
