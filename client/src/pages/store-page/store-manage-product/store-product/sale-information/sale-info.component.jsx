import { useEffect, useState } from "react";
import NumberFormat from "react-number-format";

import { Button, TextField, InputAdornment } from "@material-ui/core";

import * as MdIcon from "react-icons/md";

import storeApi from "../../../../../api/store-api";

const SaleInformation = ({
  productInfo,
  setBasicInformation,
  errors,
  onChange,
  actualComponents,
  setActualComponents,
}) => {
  const { directoryId, productDetail } = productInfo;

  const [componentList, setComponentList] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    // const list = [...productDetail];
    // list[0][name] = value;
    // setBasicInformation({ ...productInfo, productDetail: list });
    //console.log(name, value);
    onChange(name, value, 0);
  };

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    // const list = [...productDetail];

    // if (name !== "price" && name !== "stock") {
    //   list[index].componentDetails = actualComponents.map((item) => ({
    //     compId: item.id,
    //     value:
    //       item.name === name
    //         ? value
    //         : list[index].componentDetails.length > 0
    //         ? list[index].componentDetails.find((i) => i.compId === item.id)
    //             .value
    //         : "",
    //   }));
    // } else {
    //   list[index][name] = value;
    // }

    // setBasicInformation({ ...productInfo, productDetail: list });
    onChange(name, value, index);
  };

  // handle click event of the Add button
  const handleAddClick = (index) => {
    if (!actualComponents.includes(componentList[index])) {
      setActualComponents(actualComponents.concat(componentList[index]));
    } else {
      setBasicInformation({
        ...productInfo,
        productDetail: [
          ...productDetail,
          {
            price: 0,
            stock: 0,
            componentDetails: [],
          },
        ],
      });
    }
  };

  // handle click event of the Remove button to remove input
  const handleRemoveClick = (index) => {
    const list = [...productDetail];
    list.splice(index, 1);
    setBasicInformation({ ...productInfo, productDetail: list });
    if (list.length === 0) {
      setActualComponents([]);
    }
  };

  //remove component
  const handleRemoveCompo = (item) => {
    const index = actualComponents.indexOf(item);
    const list = [...actualComponents];
    list.splice(index, 1);
    setActualComponents(list);

    const ls = [...productDetail];
    ls.forEach((element) => {
      element.componentDetails.forEach((i) => {
        if (i.compId === item.id) {
          element.componentDetails.splice(
            element.componentDetails.indexOf(i),
            1
          );
        }
      });
    });
    setBasicInformation({ ...productInfo, productDetail: ls });
  };

  //set list inputs of component is empty when actualComponent change
  useEffect(() => {
    if (actualComponents.length === 0) {
      setBasicInformation({
        ...productInfo,
        productDetail: [{ price: 0, stock: 0, componentDetails: [] }],
      });
    }
  }, [actualComponents]);

  //fetch component when directory change
  useEffect(() => {
    const fetchComponentsOfDirectory = async (id) => {
      try {
        const response = await storeApi.getComponentOfDirectory(id);
        setComponentList(response);
      } catch (error) {
        console.log("Failed to fetch components of directory: ", error);
      }
    };

    if (directoryId != 0) {
      fetchComponentsOfDirectory(directoryId);
    } else {
      setComponentList([]);
    }
  }, [directoryId]);

  return (
    <div>
      <h3 className="store-product-title">Sales Information</h3>
      <div className="store-product-basic-info">
        {actualComponents.length === 0 ? (
          <div>
            <div className="store-product-group">
              <span className="store-product-info">Price</span>
              <div className="store-product-input">
                <TextField
                  fullWidth
                  name="price"
                  type="number"
                  variant="outlined"
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  {...(errors.price && {
                    error: true,
                    helperText: errors.price,
                  })}
                />
              </div>
            </div>
            <div className="store-product-group">
              <span className="store-product-info">Stock</span>
              <div className="store-product-input">
                <TextField
                  fullWidth
                  name="stock"
                  type="number"
                  variant="outlined"
                  onChange={handleChange}
                  {...(errors.stock && {
                    error: true,
                    helperText: errors.stock,
                  })}
                />
              </div>
            </div>
          </div>
        ) : null}
        <div className="store-product-group">
          <span className="store-product-info">Component group</span>
          <div className="store-product-component">
            <div className="store-product-component-header">
              {componentList.map((item, index) => (
                <Button
                  className="store-product-button"
                  variant="contained"
                  key={item.id}
                  type="button"
                  onClick={() => handleAddClick(index)}
                >
                  Add {item.name}
                </Button>
              ))}
            </div>
            <div className="store-product-component-header">
              {actualComponents.map((item) => (
                <Button
                  className="store-product-button"
                  variant="contained"
                  key={item.id}
                  type="button"
                  onClick={() => handleRemoveCompo(item)}
                >
                  Remove {item.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
        {actualComponents.length === 0 ? null : (
          <div className="store-product-group">
            <span className="store-product-info">List component</span>
            <div className="store-product-component">
              <div className="store-product-component-header">
                {actualComponents.map((item) => (
                  <div className="store-product-title-component" key={item.id}>
                    {item.name}
                  </div>
                ))}
                <div className="store-product-title-component">Price</div>
                <div className="store-product-title-component">Stock</div>
                <div style={{ width: 18 }}></div>
              </div>
              {productDetail.map((x, i) => (
                <div key={i} className="store-product-component-header">
                  {actualComponents.map((item) => (
                    <div className="store-product-input-component">
                      <TextField
                        variant="outlined"
                        key={item.id}
                        name={item.name}
                        value={x.name}
                        onChange={(e) => handleInputChange(e, i)}
                        {...(errors.component && {
                          error: true,
                          helperText: errors.component,
                        })}
                      />
                    </div>
                  ))}
                  <div className="store-product-input-component">
                    <TextField
                      variant="outlined"
                      name="price"
                      type="number"
                      value={x.price}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        ),
                      }}
                      onChange={(e) => handleInputChange(e, i)}
                      {...(errors.price && {
                        error: true,
                        helperText: errors.price,
                      })}
                    />
                  </div>
                  <div className="store-product-input-component">
                    <TextField
                      variant="outlined"
                      name="stock"
                      type="number"
                      value={x.stock}
                      onChange={(e) => handleInputChange(e, i)}
                      {...(errors.stock && {
                        error: true,
                        helperText: errors.stock,
                      })}
                    />
                  </div>
                  <div className="store-product-component-remove">
                    {productDetail.length !== 0 && (
                      <MdIcon.MdDelete onClick={() => handleRemoveClick(i)} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SaleInformation;
