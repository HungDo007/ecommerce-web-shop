import { useState } from "react";
import { useDispatch } from "react-redux";
import adminApi from "../../api/admin-api";
import { toggleModal } from "../../redux/modal/modal.actions";
import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";

const Confirm = (props) => {
  const [reason, setReason] = useState("");

  const handleChange = (event) => {
    setReason(event.target.value);
  };

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      username: props.data,
      reason: reason,
    };
    const lockAccount = () => {
      try {
        const response = adminApi.lockAccount(data);
        console.log(response);
      } catch (error) {
        console.log("Failed to lock account: ", error);
      }
    };
    lockAccount();
    dispatch(toggleModal());
  };
  return (
    <form onSubmit={handleSubmit}>
      <div style={{ margin: "20px 0" }}>{props.title}</div>
      {props.title === "Are you sure to lock this account?" ? (
        <FormInput
          name="reason"
          handleChange={handleChange}
          value={reason}
          label="Reason"
          required
        />
      ) : null}

      <div>
        <CustomButton>Confirm</CustomButton>
      </div>
    </form>
  );
};

export default Confirm;
