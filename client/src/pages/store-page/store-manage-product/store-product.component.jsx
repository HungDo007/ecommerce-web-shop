import { useState } from "react";
import "./store-product.styles.scss";
const defaultImg = "/img/default-img.png";

const StoreProduct = () => {
  const [listImageUrl, setListImageUrl] = useState(
    new Array(5).fill(defaultImg)
  );
  const handleReview = (event) => {
    console.log(event.target.files);
  };
  return (
    <div className="app">
      <h2 className="store-product-main-title"> Add product </h2>
      <hr />
      <h3 className="store-product-title">Basic Information</h3>
      <div className="store-product-basic-info">
        <div className="store-product-group">
          <span className="store-product-info">Directory</span>
          <input
            className="store-product-input"
            type="select"
            name="name"
            required
          />
        </div>
        <div className="store-product-group">
          <span className="store-product-info">Name</span>
          <input
            className="store-product-input"
            type="text"
            name="name"
            required
          />
        </div>
        <div className="store-product-group">
          <span className="store-product-info">Description</span>
          <textarea
            className="store-product-textarea "
            name="description"
            type="text"
            rows="5"
            required
          />
        </div>
        <div className="store-product-group">
          <span>Image</span>
          {listImageUrl.map((item) => (
            <label onChange={handleReview}>
              <input hidden required type="file" accept="image/*" />
              <div
                className="background-image"
                style={{
                  backgroundImage: `url(${item})`,
                }}
              >
                Choose image
              </div>
            </label>
          ))}

          {/* <input type="file" accept="image/*" required />
          <input type="file" accept="image/*" required />
          <input type="file" accept="image/*" required />
          <input type="file" accept="image/*" required /> */}
        </div>
      </div>
      <h3 className="store-product-title">Sales Information</h3>
      <div>
        <span>Component Group</span>
        <div></div>
      </div>
    </div>
  );
};

export default StoreProduct;
