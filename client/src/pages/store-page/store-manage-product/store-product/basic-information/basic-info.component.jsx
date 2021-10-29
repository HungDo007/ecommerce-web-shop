import {
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { useState } from "react";
import { useSelector } from "react-redux";
import "./basic-info.styles.scss";

const defaultImg = "/img/default-img.png";

const BasicInformation = ({
  productInfo,
  setBasicInformation,
  errors,
  onChange,
}) => {
  // if (productInfo.name && productInfo.description && productInfo.poster) {
  //   productInfo.poster = process.env.REACT_APP_IMAGE_URL + productInfo.poster;
  //   productInfo.images = [process.env.REACT_APP_IMAGE_URL + productInfo.images];
  //   const length = productInfo.images.length;
  //   if (length < 4) {
  //     for (let index = 0; index < 4 - length; index++) {
  //       productInfo.images.push(defaultImg);
  //     }
  //   }
  // }

  const {
    directoryId,
    name,
    description,
    poster,
    thumbnailFile,
    images,
    listImageFiles,
  } = productInfo;

  const directoryList = useSelector((state) => state.directories.directoryList);
  const initialDirectories = [{ id: 0, name: "Select..." }, ...directoryList];

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // setBasicInformation({ ...productInfo, [name]: value });
    onChange(name, value);
  };

  const handleThumbnail = (event) => {
    if (event.target.files && event.target.files[0]) {
      let imageFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setBasicInformation({
          ...productInfo,
          thumbnailFile: imageFile,
          poster: x.target.result,
        });
      };
      reader.readAsDataURL(imageFile);
    } else {
      setBasicInformation({
        ...productInfo,
        thumbnailFile: null,
        poster: defaultImg,
      });
    }
  };

  const handleImages = (selectorFiles, position) => {
    if (selectorFiles) {
      let imageFile = selectorFiles[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        images[position] = x.target.result;
        listImageFiles[position] = imageFile;
        setBasicInformation({
          ...productInfo,
          listImageFiles,
          images,
        });
      };
      reader.readAsDataURL(imageFile);
    } else {
      images[position] = defaultImg;
      listImageFiles[position] = null;
      setBasicInformation({
        ...productInfo,
        listImageFiles,
        images,
      });
    }
  };
  return (
    <div>
      <h3 className="store-product-title">Basic Information</h3>
      <div className="store-product-basic-info">
        <div className="store-product-group">
          <span className="store-product-info">Directory</span>
          <div className="store-product-input">
            <FormControl
              fullWidth
              variant="outlined"
              {...(errors.directoryId && {
                error: true,
              })}
            >
              <Select
                name="directoryId"
                value={directoryId}
                onChange={handleInputChange}
              >
                {initialDirectories.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
              {errors.directoryId && (
                <FormHelperText>{errors.directoryId}</FormHelperText>
              )}
            </FormControl>
          </div>
        </div>
        <div className="store-product-group">
          <span className="store-product-info">Name</span>
          <div className="store-product-input">
            <TextField
              fullWidth
              name="name"
              type="text"
              variant="outlined"
              value={name}
              onChange={handleInputChange}
              {...(errors.name && {
                error: true,
                helperText: errors.name,
              })}
            />
          </div>
        </div>
        <div className="store-product-group">
          <span className="store-product-info">Description</span>
          <div className="store-product-input">
            <TextField
              fullWidth
              multiline
              name="description"
              type="text"
              maxRows={8}
              minRows={8}
              variant="outlined"
              value={description}
              onChange={handleInputChange}
              {...(errors.description && {
                error: true,
                helperText: errors.description,
              })}
            />
          </div>
        </div>
        <div className="store-product-group">
          <span className="store-product-info">Thumbnail</span>
          <label className="store-product-thumbnail" onChange={handleThumbnail}>
            <input hidden type="file" accept="image/*" />
            <img
              className="background-thumbnail"
              src={poster ? poster : defaultImg}
              alt="store"
            />
          </label>
        </div>
        <div className="store-product-group">
          <span className="store-product-info">Images</span>
          {images.map((item, index) => (
            <label
              key={index}
              onChange={(e) => handleImages(e.target.files, index)}
            >
              <input hidden type="file" accept="image/*" />
              <img
                className="background-image"
                src={item ? item : defaultImg}
                alt="store"
              />
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BasicInformation;
