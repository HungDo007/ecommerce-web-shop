import { useState } from "react";
import { Link } from "react-router-dom";
import CustomButton from "../../components/custom-button/custom-button.component";
import "./store-profile.styles.scss";
const defaultImg = "/img/default-img.png";

const StoreProfile = ({ match }) => {
  const storeInfo = {
    name: "hungdo",
    phoneNumber: "01234567",
    address: "tp HCM",
    description: "",
    imageSrc: defaultImg,
    imageFile: null,
  };

  const [values, setValues] = useState(storeInfo);

  const { name, phoneNumber, address, description, imageSrc, imageFile } =
    values;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues({ ...values, [name]: value });
  };

  const handleReview = (event) => {
    if (event.target.files && event.target.files[0]) {
      let imageFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setValues({
          ...values,
          imageFile,
          imageSrc: x.target.result,
        });
      };
      reader.readAsDataURL(imageFile);
    } else {
      setValues({
        ...values,
        imageFile: null,
        imageSrc: defaultImg,
      });
    }
  };

  return (
    <div className="store-container">
      <h3 className="store-main-title">Store Profile</h3>
      <div className="details">
        <div className="store-content-left">
          <img className="store-image" src={imageSrc} alt="store" />
          <input type="file" accept="image/*" onChange={handleReview} />
          <p>Choose Image</p>
          <div className="store-links">
            <div className="store-link">
              <Link to={`${match.path}/manageProduct`}>Product</Link>
            </div>
            <div className="store-link">
              <Link to="/allProduct">Purchase order</Link>
            </div>
            <div className="store-link">
              <Link to="/allProduct">Statistic</Link>{" "}
            </div>
          </div>
        </div>
        <div className="store-info">
          <span className="store-title">Store Name</span>
          <input
            className="store-input"
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            required
          />
          <span className="store-title">Phone Number</span>
          <input
            className="store-input"
            type="text"
            name="phoneNumber"
            value={phoneNumber}
            onChange={handleChange}
            required
          />
          <span className="store-title">Address</span>
          <input
            className="store-input"
            type="text"
            name="address"
            value={address}
            onChange={handleChange}
            required
          />
          <span className="store-title">Description</span>
          <textarea
            className="store-textarea"
            name="description"
            placeholder="Enter description or your store information here"
            type="text"
            rows="5"
            value={description}
            required
            onChange={handleChange}
          />
        </div>
      </div>
      <CustomButton>Save</CustomButton>
    </div>
  );
};

export default StoreProfile;
