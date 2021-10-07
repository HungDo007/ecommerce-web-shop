import { useState } from "react";

import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";

import "./sign-up.styles.scss";
import adminApi from "../../api/admin-api";
import userApi from "../../api/user-api";

const SignUp = ({ currentUser }) => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { username, email, password, confirmPassword } = userInfo;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      userName: username,
      email: email,
      password: password,
    };

    if (password !== confirmPassword) {
      alert("Password don't match");
      return;
    }

    if (currentUser) {
      if (currentUser.role === "Admin") {
        const addAdmin = async () => {
          try {
            const response = await adminApi.addAmin(data);
            console.log(response);
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
  };

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
