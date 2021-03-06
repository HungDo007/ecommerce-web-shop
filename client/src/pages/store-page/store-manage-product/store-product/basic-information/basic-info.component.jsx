import { useSelector } from "react-redux";
import {
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";

import { isFileImage } from "../../../../../utils/check-image";

import "./basic-info.styles.scss";

const defaultImg = "/img/default-img.png";

const BasicInformation = ({
  productInfo,
  errors,
  onChange,
  setBasicInformation,
  setNotify,
}) => {
  if (productInfo.id) {
    const length = productInfo.images.length;
    if (length < 4) {
      for (let index = 0; index < 4 - length; index++) {
        productInfo.images.push(defaultImg);
      }
    }
  }

  const { category, name, description, poster, images, listImageFiles } =
    productInfo;

  const directoryList = useSelector((state) => state.directories.directoryList);
  const initialDirectories = [{ id: 0, name: "Select..." }, ...directoryList];

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    onChange(name, value);
  };

  const handleThumbnail = (event) => {
    if (event.target.files && event.target.files[0]) {
      let imageFile = event.target.files[0];
      if (!isFileImage(imageFile)) {
        setNotify({
          isOpen: true,
          message: "Please select image file",
          type: "warning",
        });
      } else {
        const reader = new FileReader();
        reader.onload = (x) => {
          setBasicInformation({
            ...productInfo,
            thumbnailFile: imageFile,
            poster: x.target.result,
          });
        };
        reader.readAsDataURL(imageFile);
      }
    } else {
      setBasicInformation({
        ...productInfo,
        thumbnailFile: null,
        poster: defaultImg,
      });
    }
  };

  const handleImages = (selectorFiles, position) => {
    if (selectorFiles && selectorFiles[0]) {
      let imageFile = selectorFiles[0];
      if (!isFileImage(imageFile)) {
        setNotify({
          isOpen: true,
          message: "Please select image file",
          type: "warning",
        });
      } else {
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
      }
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
    <div className="basic-info-container">
      <h3 className="store-product-title">Basic Information</h3>
      <div className="store-product-basic-info">
        <div className="store-product-group">
          <span className="store-product-info">Directory</span>
          <div className="store-product-input">
            <FormControl
              fullWidth
              variant="outlined"
              {...(errors.category && {
                error: true,
              })}
            >
              <Select
                name="category"
                value={category}
                onChange={handleInputChange}
              >
                {initialDirectories.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
              {errors.category && (
                <FormHelperText>{errors.category}</FormHelperText>
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
          <div className="store-product-thumbnail">
            <label onChange={handleThumbnail}>
              <input hidden type="file" accept="image/*" />
              <img
                className="background-thumbnail"
                src={poster ? poster : defaultImg}
                alt="store"
              />
            </label>
          </div>
        </div>
        <div className="store-product-group">
          <span className="store-product-info">Images</span>
          <div className="store-product-input">
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
    </div>
  );
};

export default BasicInformation;
