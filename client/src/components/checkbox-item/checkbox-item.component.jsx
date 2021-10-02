import "./checkbox-item.styles.css";

const Checkbox = ({ item, onChange, checked }) => {
  const handleOnChange = () => {
    onChange();
  };
  return (
    <label className="container">
      <input type="checkbox" onChange={handleOnChange} checked={checked} />
      {item.name}
      <span className="checkmark"></span>
    </label>
  );
};

export default Checkbox;
