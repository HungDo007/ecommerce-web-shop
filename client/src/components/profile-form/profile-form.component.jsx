import { useState } from "react";

import DateFnsUtils from "@date-io/date-fns";
import { Button, TextField } from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

import "./profile-form.styles.scss";

const ProfileForm = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    dob: new Date(2000, 1, 1),
    phoneNumber: "",
    address: "",
  };
  const [values, setValue] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const { firstName, lastName, dob, phoneNumber, address } = values;

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("firstName" in fieldValues)
      temp.firstName = fieldValues.firstName ? "" : "This field is required";
    if ("lastName" in fieldValues)
      temp.lastName = fieldValues.lastName ? "" : "This field is required";
    if ("phoneNumber" in fieldValues)
      temp.phoneNumber =
        fieldValues.phoneNumber.length > 9 ? "" : "Minimum 10 numbers required";
    if ("address" in fieldValues)
      temp.address = fieldValues.address ? "" : "This field is required";

    setErrors({ ...temp });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setValue({ ...values, [name]: value });
    validate({ [name]: value });
  };

  const handleDateChange = (date) => {
    setValue({ ...values, dob: date });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validate()) {
      alert("submit");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="profile-user-info">
        <h2>User Profile</h2>
        <div className="profile-field">
          <div className="profile-info">Username</div>
          <div className="profile-value">hungdo</div>
        </div>
        <div className="profile-field">
          <div className="profile-info">First Name</div>
          <div className="profile-value">
            <TextField
              name="firstName"
              value={firstName}
              variant="outlined"
              fullWidth
              onChange={handleInputChange}
              {...(errors.firstName && {
                error: true,
                helperText: errors.firstName,
              })}
            />
          </div>
        </div>
        <div className="profile-field">
          <div className="profile-info">Last Name</div>
          <div className="profile-value">
            <TextField
              name="lastName"
              value={lastName}
              variant="outlined"
              fullWidth
              onChange={handleInputChange}
              {...(errors.lastName && {
                error: true,
                helperText: errors.lastName,
              })}
            />
          </div>
        </div>
        <div className="profile-field">
          <div className="profile-info">Date Of Birth</div>
          <div className="profile-value">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableFuture
                fullWidth
                name="dob"
                openTo="year"
                format="dd/MM/yyyy"
                label="Date of birth"
                views={["year", "month", "date"]}
                value={dob}
                onChange={(date) => handleDateChange(date)}
              />
            </MuiPickersUtilsProvider>
          </div>
        </div>
        <div className="profile-field">
          <div className="profile-info">Phone Number</div>
          <div className="profile-value">
            <TextField
              name="phoneNumber"
              value={phoneNumber}
              variant="outlined"
              fullWidth
              onChange={handleInputChange}
              {...(errors.phoneNumber && {
                error: true,
                helperText: errors.phoneNumber,
              })}
            />
          </div>
        </div>
        <div className="profile-field">
          <div className="profile-info">Address</div>
          <div className="profile-value">
            <TextField
              fullWidth
              multiline
              rows={4}
              name="address"
              value={address}
              variant="outlined"
              onChange={handleInputChange}
              {...(errors.address && {
                error: true,
                helperText: errors.address,
              })}
            />
          </div>
        </div>
        <div className="profile-button">
          <Button
            type="submit"
            className="profile-button-submit"
            variant="contained"
          >
            Save
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ProfileForm;
