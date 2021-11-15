import { Button, TextField } from "@material-ui/core";
import { useState } from "react";
import { useSelector } from "react-redux";
import userApi from "../../api/user-api";

const ActiveEmailForm = () => {
  const [state, setState] = useState({
    code: "",
  });

  const [errors, setErrors] = useState({});

  const currentUser = useSelector((state) => state.user.currentUser);

  const validate = (fieldValues = state) => {
    let temp = { ...errors };
    if ("code" in fieldValues)
      temp.code = fieldValues.code ? "" : "This field is required";

    setErrors({ ...temp });

    if (fieldValues === state) {
      return Object.values(temp).every((x) => x === "");
    }
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;

    setState({ ...state, [name]: value });
    validate({ [name]: value });
  };

  const data = {
    username: currentUser.unique_name,
    email: currentUser.email,
  };

  const handleSendCode = () => {
    const sendCode = async () => {
      try {
        const response = await userApi.sendCode(data);
        console.log(response);
      } catch (error) {
        console.log("Failed to send code: ", error.response);
      }
    };

    sendCode();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validate()) {
      const verifyEmail = async () => {
        try {
          const payload = { ...data, code: state.code };
          const response = await userApi.verifyEmail(payload);
          console.log(response);
        } catch (error) {
          console.log("Failed to verify email: ", error.response);
          if (error.response.data === "Mã nhập không đúng")
            setErrors({ code: "Code is incorrect" });
        }
      };

      verifyEmail();
    }
  };

  return (
    <div style={{ width: 375, textAlign: "center" }}>
      <div style={{ margin: 15 }}>
        Active email to create store. Check your email after clicking on Send
        Code button and entering the code here.
      </div>
      <div style={{ margin: 15 }}>
        <Button
          onClick={handleSendCode}
          style={{
            borderRadius: 24,
            backgroundColor: "rgb(45 42 212)",
            padding: "10px 26px",
            fontSize: "14px",
            color: "white",
          }}
        >
          Send Code
        </Button>
      </div>
      <form onSubmit={handleSubmit}>
        <div style={{ margin: 15 }}>
          <TextField
            type="text"
            name="code"
            value={state.code}
            onChange={handleOnChange}
            label="Enter code"
            fullWidth
            {...(errors.code && {
              error: true,
              helperText: errors.code,
            })}
          />
        </div>
        <div style={{ margin: "auto" }}>
          <Button
            type="submit"
            style={{
              borderRadius: 24,
              backgroundColor: "rgb(45 42 212)",
              padding: "10px 26px",
              fontSize: "14px",
              color: "white",
            }}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ActiveEmailForm;
