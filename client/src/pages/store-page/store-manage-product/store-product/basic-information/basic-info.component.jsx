import { useState } from "react";
import { useSelector } from "react-redux";
import "./basic-info.styles.scss";

const defaultImg = "/img/default-img.png";

const BasicInformation = ({ productInfo, setBasicInformation }) => {
  const {
    directoryId,
    name,
    description,
    thumbnailUrl,
    thumbnailFile,
    listImageUrls,
    listImageFiles,
  } = productInfo;

  const directoryList = useSelector((state) => state.directories.directoryList);
  const initialDirectories = [{ id: 0, name: "Select..." }, ...directoryList];

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBasicInformation({ ...productInfo, [name]: value });
  };

  const handleThumbnail = (event) => {
    if (event.target.files && event.target.files[0]) {
      let imageFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setBasicInformation({
          ...productInfo,
          thumbnailFile: imageFile,
          thumbnailUrl: x.target.result,
        });
      };
      reader.readAsDataURL(imageFile);
    } else {
      setBasicInformation({
        ...productInfo,
        thumbnailFile: null,
        thumbnailUrl: defaultImg,
      });
    }
  };

  const handleImages = (selectorFiles, position) => {
    if (selectorFiles) {
      let imageFile = selectorFiles[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        listImageUrls[position] = x.target.result;
        listImageFiles[position] = imageFile;
        setBasicInformation({
          ...productInfo,
          listImageFiles,
          listImageUrls,
        });
      };
      reader.readAsDataURL(imageFile);
    } else {
      listImageUrls[position] = defaultImg;
      listImageFiles[position] = null;
      setBasicInformation({
        ...productInfo,
        listImageFiles,
        listImageUrls,
      });
    }
  };

  return (
    <div>
      <h3 className="store-product-title">Basic Information</h3>
      <div className="store-product-basic-info">
        <div className="store-product-group">
          <span className="store-product-info">Directory</span>
          <select
            className="store-product-input"
            name="directoryId"
            onChange={handleInputChange}
            value={directoryId}
          >
            {initialDirectories.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="store-product-group">
          <span className="store-product-info">Name</span>
          <input
            className="store-product-input"
            type="text"
            name="name"
            required
            value={name}
            onChange={handleInputChange}
          />
        </div>
        <div className="store-product-group">
          <span className="store-product-info">Description</span>
          <textarea
            className="store-product-textarea "
            name="description"
            type="text"
            rows="8"
            required
            value={description}
            onChange={handleInputChange}
          />
        </div>
        <div className="store-product-group">
          <span className="store-product-info">Thumbnail</span>
          <label className="store-product-thumbnail" onChange={handleThumbnail}>
            <input hidden type="file" accept="image/*" />
            <div
              className="background-thumbnail"
              style={{
                backgroundImage: `url(${thumbnailUrl})`,
              }}
            ></div>
          </label>
        </div>
        <div className="store-product-group">
          <span className="store-product-info">Images</span>
          {listImageUrls.map((item, index) => (
            <label
              key={index}
              onChange={(e) => handleImages(e.target.files, index)}
            >
              <input hidden type="file" accept="image/*" />
              <div
                className="background-image"
                style={{
                  backgroundImage: `url(${item})`,
                }}
              ></div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BasicInformation;
