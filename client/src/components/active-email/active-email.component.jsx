import { Button, TextField } from "@material-ui/core";

const ActiveEmailForm = () => {
  return (
    <div style={{ width: 375, textAlign: "center" }}>
      <div style={{ margin: 15 }}>
        Check your email after clicking on Send Code button and entering the
        code here
      </div>
      <div style={{ margin: 15 }}>
        <Button
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
      <div style={{ margin: 15 }}>
        <TextField label="Enter code" fullWidth />
      </div>
      <div style={{ margin: "auto" }}>
        <Button
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
    </div>
  );
};

export default ActiveEmailForm;
