import { useState } from "react";
import axios from "axios";

import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";

import "./sign-up.styles.scss";

const SignUp = ({ currentUser }) => {
  let url = "";
  let config = null;
  currentUser
    ? currentUser.role === "Admin"
      ? (url = "http://localhost:5000/api/Admins/addAdmin") &&
        (config = {
          headers: {
            Authorization: "Bearer " + currentUser.jwtToken,
          },
        })
      : (url = "http://localhost:5000/api/Users/register")
    : (url = "http://localhost:5000/api/Users/register");

  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { username, email, password, confirmPassword } = userInfo;

  const data = {
    userName: username,
    email: email,
    password: password,
  };

  const signUp = async () => {
    try {
      const response = await axios.post(url, data, config);
      console.log(response);
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

    if (password !== confirmPassword) {
      alert("Password don't match");
      return;
    }

    signUp();
  };

  console.log(config, url);
  return (
    <div className="sign-up">
      <h2>I do not have a account</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
          label="Username"
          required
        />
        <FormInput
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          label="Email"
          required
        />
        <FormInput
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          label="Password"
          required
        />
        <FormInput
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          label="Confirm Password"
          required
        />
        <CustomButton type="submit">SIGN UP</CustomButton>
      </form>
    </div>
  );
};

export default SignUp;
