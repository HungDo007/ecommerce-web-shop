import { useEffect, useState } from "react";

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
  const { category, productDetails } = productInfo;

  const [componentList, setComponentList] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    onChange(name, value, 0);
  };

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    onChange(name, value, index);
  };

  // handle click event of the Add button
  const handleAddClick = (index) => {
    if (!actualComponents.some((item) => item.id === componentList[index].id)) {
      setActualComponents(actualComponents.concat(componentList[index]));
    } else {
      setBasicInformation({
        ...productInfo,
        productDetails: [
          ...productDetails,
          {
            price: "",
            stock: "",
            componentDetails: [{ compId: 0, value: "" }],
          },
        ],
      });
    }
  };

  // handle click event of the Remove button to remove input
  const handleRemoveClick = (index) => {
    const list = [...productDetails];
    list.splice(index, 1);
    setBasicInformation({ ...productInfo, productDetails: list });
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

    const ls = [...productDetails];
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
    setBasicInformation({ ...productInfo, productDetails: ls });
  };

  useEffect(() => {
    if (productInfo.id) {
      if (
        productDetails.length !== 1 ||
        productDetails[0].componentDetails.length > 0
      ) {
        const array = productDetails[0].componentDetails.map((item) => {
          const compo = componentList.find((i) => i.id === item.compId);
          return {
            id: compo ? compo.id : "",
            name: compo ? compo.name : "",
          };
        });
        setActualComponents(array);
      }
    }
  }, [componentList]);

  //set list inputs of component is empty when actualComponent is 0
  useEffect(() => {
    if (actualComponents.length === 0) {
      setBasicInformation({
        ...productInfo,
        productDetails: [{ price: "", stock: "", componentDetails: [] }],
      });
    }
  }, [actualComponents]);

  //fetch component when directory change
  useEffect(() => {
    const fetchComponentsOfDirectory = async (id) => {
      try {
        const response = await storeApi.getComponentOfDirectory(id);
        setComponentList(response);
      } catch (error) {}
    };

    if (category !== 0) {
      fetchComponentsOfDirectory(category);
    } else {
      setComponentList([]);
    }

    if (componentList.length && category !== 0) {
      setActualComponents([]);
    }
  }, [category]);

  return (
    <div className="basic-info-container">
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
                  value={
                    productDetails[0]?.price ? productDetails[0].price : ""
                  }
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
                  value={
                    productDetails[0]?.stock ? productDetails[0].stock : ""
                  }
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
              {productDetails.map((x, i) => (
                <div key={i} className="store-product-component-header">
                  {actualComponents.map((item, index) => (
                    <div
                      className="store-product-input-component"
                      key={item.id}
                    >
                      <TextField
                        variant="outlined"
                        name={item.name}
                        value={
                          x.componentDetails[
                            x.componentDetails.findIndex(
                              (i) => i.name === item.name
                            )
                          ]?.value
                            ? x.componentDetails[
                                x.componentDetails.findIndex(
                                  (i) => i.name === item.name
                                )
                              ].value
                            : ""
                        }
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
                    {productDetails.length !== 0 && (
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
