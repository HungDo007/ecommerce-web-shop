import { useState } from "react";
import { useDispatch } from "react-redux";

import { Button, TextField } from "@material-ui/core";

import adminApi from "../../api/admin-api";

import { toggleModal } from "../../redux/modal/modal.actions";

const Confirm = (props) => {
  const [state, setState] = useState({
    reason: "",
  });

  const [errors, setErrors] = useState({});

  const validate = (fieldValues = state) => {
    let temp = { ...errors };
    if ("reason" in fieldValues) {
      temp.reason = fieldValues.reason ? "" : "This field is required";
      if (fieldValues.reason) {
        temp.reason = /^(?=.*).{5,}$/.test(fieldValues.reason)
          ? ""
          : "5 character required";
      }
    }

    setErrors({ ...temp });

    return Object.values(temp).every((x) => x === "");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
    validate({ [name]: value });
  };

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (props.title === "Are you sure to lock this account?") {
      const data = {
        username: props.data,
        reason: state.reason,
      };
      const lockAccount = async () => {
        try {
          const response = await adminApi.lockAccount(data);
          if (response.status === 200 && response.statusText === "OK") {
            props.tableRef.current.onQueryChange();
          }
        } catch (error) {}
      };
      if (validate()) {
        lockAccount();
        dispatch(toggleModal());
      }
    } else if (props.title === "Are you sure to lock this product?") {
      const data = {
        proId: props.data,
        reason: state.reason,
      };
      const lockProduct = async () => {
        try {
          const response = await adminApi.lockProduct(data);
          if (response.status === 200 && response.statusText === "OK") {
            props.tableRef.current.onQueryChange();
          }
        } catch (error) {}
      };
      if (validate()) {
        lockProduct();
        dispatch(toggleModal());
      }
    } else {
      props.onSubmit();
    }
  };

  return (
    <form style={{ width: 410 }} onSubmit={handleSubmit}>
      <div style={{ margin: "20px 0" }}>{props.title}</div>
      {props.title === "Are you sure to lock this account?" ||
      props.title === "Are you sure to lock this product?" ? (
        <TextField
          fullWidth
          name="reason"
          label="Reason"
          type="text"
          onChange={handleChange}
          value={state.reason}
          {...(errors.reason && {
            error: true,
            helperText: errors.reason,
          })}
        />
      ) : null}
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}
      >
        <Button variant="contained" type="submit" color="primary">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default Confirm;
