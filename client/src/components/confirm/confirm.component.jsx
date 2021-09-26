import CustomButton from "../custom-button/custom-button.component";

const Confirm = (props) => {
  console.log(props);
  return (
    <div>
      <div style={{ margin: "20px 0" }}>Are you sure to hide this item?</div>
      <div>
        <CustomButton>Confirm</CustomButton>
      </div>
    </div>
  );
};

export default Confirm;
