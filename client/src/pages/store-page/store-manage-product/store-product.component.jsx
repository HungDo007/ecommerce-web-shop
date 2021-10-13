import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CustomButton from "../../../components/custom-button/custom-button.component";
import * as MdIcon from "react-icons/md";
import "./store-product.styles.scss";
const defaultImg = "/img/default-img.png";

const StoreProduct = () => {
  const productInfo = {
    directory: "",
    name: "",
    description: "",
    thumbnailUrl: defaultImg,
    thumbnailFile: null,
    listImageUrls: new Array(4).fill(defaultImg),
    listImageFiles: [],
  };

  const [values, setValues] = useState(productInfo);
  const {
    directory,
    name,
    description,
    thumbnailUrl,
    thumbnailFile,
    listImageUrls,
    listImageFiles,
  } = values;

  const directoryList = useSelector((state) => state.directories.directoryList);
  const dl = [{ id: "000", name: "Select..." }, ...directoryList];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleImages = (selectorFiles, position) => {
    if (selectorFiles) {
      let imageFile = selectorFiles[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        listImageUrls[position] = x.target.result;
        listImageFiles[position] = imageFile;
        setValues({
          ...values,
          listImageFiles,
          listImageUrls,
        });
      };
      reader.readAsDataURL(imageFile);
    } else {
      listImageUrls[position] = defaultImg;
      listImageFiles[position] = null;
      setValues({
        ...values,
        listImageFiles,
        listImageUrls,
      });
    }
  };

  const handleThumbnail = (event) => {
    if (event.target.files && event.target.files[0]) {
      let imageFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setValues({
          ...values,
          thumbnailFile: imageFile,
          thumbnailUrl: x.target.result,
        });
      };
      reader.readAsDataURL(imageFile);
    } else {
      setValues({
        ...values,
        thumbnailFile: null,
        thumbnailUrl: defaultImg,
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  //
  const [inputList, setInputList] = useState([]);
  const [compoList, setCompoList] = useState([
    {
      id: 1,
      name: "Color",
    },
    {
      id: 2,
      name: "Size",
    },
    {
      id: 3,
      name: "cmm",
    },
  ]);
  const [actualCompo, setActualCompo] = useState([]);
  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
    if (list.length === 0) {
      setActualCompo([]);
    }
  };

  // handle click event of the Add button
  const handleAddClick = (index) => {
    if (!actualCompo.includes(compoList[index])) {
      setActualCompo(actualCompo.concat(compoList[index]));
    }
    setInputList([...inputList, { price: 0, stock: 0 }]);
  };

  const handleRemoveCompo = (item) => {
    const index = actualCompo.indexOf(item);
    const list = [...actualCompo];
    list.splice(index, 1);
    setActualCompo(list);
  };

  useEffect(() => {
    if (actualCompo.length === 0) {
      setInputList([]);
    }
  }, [actualCompo]);
  return (
    <form onSubmit={handleSubmit} className="app">
      <h2 className="store-product-main-title"> Add product </h2>
      <hr />
      <h3 className="store-product-title">Basic Information</h3>
      <div className="store-product-basic-info">
        <div className="store-product-group">
          <span className="store-product-info">Directory</span>
          <select
            className="store-product-input"
            name="directory"
            onChange={handleChange}
            value={directory}
          >
            {dl.map((item) => (
              <option key={item.id} value={item.name}>
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
            onChange={handleChange}
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
            onChange={handleChange}
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
      <h3 className="store-product-title">Sales Information</h3>
      <div className="store-product-basic-info">
        {actualCompo.length === 0 ? (
          <div>
            <div className="store-product-group">
              <span className="store-product-info">Price</span>
              <input
                className="store-product-input"
                type="number"
                name="price"
                required
                onChange={handleChange}
              />
            </div>
            <div className="store-product-group">
              <span className="store-product-info">Stock</span>
              <input
                className="store-product-input"
                type="number"
                name="stock"
                required
                onChange={handleChange}
              />
            </div>
          </div>
        ) : null}

        <div className="store-product-group">
          <span className="store-product-info">Component group</span>
          <div className="store-product-input">
            <div className="store-product-component-header">
              {compoList.map((item, index) => (
                <CustomButton
                  key={item.id}
                  type="button"
                  onClick={() => handleAddClick(index)}
                >
                  Add {item.name}
                </CustomButton>
              ))}
            </div>
            <div className="store-product-component-header">
              {actualCompo.map((item) => (
                <CustomButton
                  key={item.id}
                  type="button"
                  onClick={() => handleRemoveCompo(item)}
                >
                  Remove {item.name}
                </CustomButton>
              ))}
            </div>
          </div>
        </div>
        {actualCompo.length === 0 ? null : (
          <div className="store-product-group">
            <span className="store-product-info">List component</span>
            <div className="store-product-input">
              <div className="store-product-component-header">
                {actualCompo.map((item) => (
                  <div className="store-product-title-component" key={item.id}>
                    {item.name}
                  </div>
                ))}
                <div className="store-product-title-component">Price</div>
                <div className="store-product-title-component">Stock</div>
                <div style={{ width: 18 }}></div>
              </div>
              {inputList.map((x, i) => (
                <div key={i} className="store-product-component-header">
                  {actualCompo.map((item) => (
                    <input
                      className="store-product-input-component"
                      key={item.id}
                      required
                      name={item.name}
                      value={x.name}
                      onChange={(e) => handleInputChange(e, i)}
                    />
                  ))}
                  <input
                    className="store-product-input-component"
                    required
                    name="price"
                    value={x.price}
                    onChange={(e) => handleInputChange(e, i)}
                  />
                  <input
                    className="store-product-input-component"
                    required
                    name="stock"
                    value={x.stock}
                    onChange={(e) => handleInputChange(e, i)}
                  />
                  <div className="store-product-component-remove">
                    {inputList.length !== 0 && (
                      <MdIcon.MdDelete onClick={() => handleRemoveClick(i)} />
                    )}
                  </div>
                </div>
              ))}
              <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div>
            </div>
          </div>
        )}
      </div>
      <CustomButton type="submit">Submit</CustomButton>
    </form>
  );
};

export default StoreProduct;
