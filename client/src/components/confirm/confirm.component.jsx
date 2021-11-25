import { useState } from "react";
import { useDispatch } from "react-redux";

import { Button } from "@material-ui/core";

import adminApi from "../../api/admin-api";

import { toggleModal } from "../../redux/modal/modal.actions";

import FormInput from "../form-input/form-input.component";

const Confirm = (props) => {
  const [reason, setReason] = useState("");

  const handleChange = (event) => {
    setReason(event.target.value);
  };

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (props.title === "Are you sure to lock this account?") {
      const data = {
        username: props.data,
        reason: reason,
      };
      const lockAccount = async () => {
        try {
          const response = await adminApi.lockAccount(data);
          console.log(response);
        } catch (error) {
          console.log("Failed to lock account: ", error.response);
        }
      };
      lockAccount();
      dispatch(toggleModal());
    } else if (props.title === "Are you sure to lock this product?") {
      const data = {
        proId: props.data,
        reason: reason,
      };
      const lockProduct = async () => {
        try {
          const response = await adminApi.lockProduct(data);
          console.log(response);
        } catch (error) {
          console.log("Failed to lock account: ", error.response);
        }
      };
      lockProduct();
      //console.log(data);
      dispatch(toggleModal());
    } else {
      props.onSubmit();
    }
  };

  return (
    <form style={{ width: 410 }} onSubmit={handleSubmit}>
      <div style={{ margin: "20px 0" }}>{props.title}</div>
      {props.title === "Are you sure to lock this account?" ||
      props.title === "Are you sure to lock this product?" ? (
        <FormInput
          name="reason"
          handleChange={handleChange}
          value={reason}
          label="Reason"
          required
        />
      ) : null}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          onClick={handleSubmit}
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
  );
};

export default Confirm;
