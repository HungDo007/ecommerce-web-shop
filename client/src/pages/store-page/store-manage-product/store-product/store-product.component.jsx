import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, CircularProgress } from "@material-ui/core";

import BasicInformation from "./basic-information/basic-info.component";
import Notification from "../../../../components/notification/notification.component";
import SaleInformation from "./sale-information/sale-info.component";

import catalogApi from "../../../../api/catalog-api";
import storeApi from "../../../../api/store-api";

import "./store-product.styles.scss";

const defaultImg = "/img/default-img.png";

const StoreProduct = (props) => {
  const [productInfo, setProductInfo] = useState({
    id: undefined,
    category: 0,
    name: "",
    description: "",
    poster: defaultImg,
    thumbnailFile: null,
    images: new Array(4).fill(defaultImg),
    listImageFiles: [],
    productDetails: [{ price: "", stock: "", componentDetails: [] }],
  });
  const [errors, setErrors] = useState({});
  const [actualComponents, setActualComponents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const { thumbnailFile, productDetails } = productInfo;

  const currentUser = useSelector((state) => state.user.currentUser);

  const validateBasicInfo = (fieldValues = productInfo) => {
    let temp = { ...errors };

    if ("name" in fieldValues)
      temp.name = fieldValues.name ? "" : "This field is required";
    if ("description" in fieldValues)
      temp.description = fieldValues.description
        ? ""
        : "This field is required";
    if ("category" in fieldValues)
      temp.category =
        fieldValues.category !== 0 ? "" : "This field is required";

    setErrors({ ...temp });

    if (fieldValues === productInfo)
      return Object.values(temp).every((x) => x === "");
  };

  const validate = (field = productDetails) => {
    let temp = { ...errors };
    productDetails.forEach((element, index) => {
      if ("price" in element) {
        // temp.price = [];
        temp.price =
          element.price > 0 ? "" : "The price must be greater than 0 ";
      }
      if ("stock" in element) {
        // temp.stock = [];
        temp.stock =
          element.stock > 0 ? "" : "The stock must be greater than 0 ";
      }
      if (element.componentDetails.length < actualComponents.length) {
        temp.component = "This field is required";
      } else {
        element.componentDetails.forEach((item) => {
          if ("value" in item) {
            temp.component = item.value ? "" : "This field is required";
          }
        });
      }
    });

    setErrors({ ...temp });

    return Object.values(temp).every((x) => x === "");
  };

  const handleInputChange = (name, value, index) => {
    if (name === "name" || name === "description" || name === "category") {
      setProductInfo({ ...productInfo, [name]: value });
      validateBasicInfo({ [name]: value });
    } else {
      const list = [...productDetails];
      if (name !== "price" && name !== "stock") {
        list[index].componentDetails = actualComponents.map((item) => ({
          compId: item.id,
          name: item.name,
          value:
            item.name === name
              ? value
              : list[index].componentDetails.length > 0
              ? list[index].componentDetails.find((i) => i.compId === item.id)
                  ?.value
              : "",
        }));
      } else {
        list[index][name] = value;
      }
      validate({ productDetails: value });
      setProductInfo({ ...productInfo, productDetails: list });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    //validate form
    if (validateBasicInfo() && validate()) {
      //check thumbnail
      if (thumbnailFile === null) {
        setNotify({
          isOpen: true,
          message: "Please choose thumbnail and image!",
          type: "error",
        });
      } else {
        const formData = new FormData();

        formData.append("seller", currentUser.unique_name);
        formData.append("name", productInfo.name);
        formData.append("description", productInfo.description);
        formData.append("categories", productInfo.category);
        formData.append("poster", productInfo.thumbnailFile);

        if (productInfo.listImageFiles.length !== 0) {
          for (let i = 0; i < productInfo.listImageFiles.length; i++) {
            formData.append("images", productInfo.listImageFiles[i]);
          }
        }

        //edit product
        if (productInfo.id) {
          const editProduct = async () => {
            try {
              formData.append("id", productInfo.id);
              await storeApi.editProduct(formData);
            } catch (error) {
              setNotify({
                isOpen: true,
                message: "Sorry, Something went wrong",
                type: "error",
              });
            }
          };
          const editDetail = async () => {
            try {
              const response = await storeApi.editDetail(
                productDetails,
                props.location.state
              );
              if (response.status === 200 && response.statusText === "OK") {
                props.history.push("/store/manageProduct");
              }
            } catch (error) {
              setNotify({
                isOpen: true,
                message: "Sorry, Something went wrong",
                type: "error",
              });
            }
          };
          editProduct();
          editDetail();
        } else {
          //add product
          const addDetail = async (productId) => {
            try {
              const response = await storeApi.addDetail(
                productId,
                productDetails
              );
              if (response.status === 200 && response.statusText === "OK") {
                props.history.push("/store/manageProduct");
              }
            } catch (error) {
              setNotify({
                isOpen: true,
                message: "Sorry, Something went wrong",
                type: "error",
              });
            }
          };

          const addProduct = async () => {
            try {
              const productId = await storeApi.addProduct(formData);
              addDetail(productId);
            } catch (error) {
              setNotify({
                isOpen: true,
                message: "Sorry, Something went wrong",
                type: "error",
              });
            }
          };
          addProduct();
        }
      }
    } else {
      setNotify({
        isOpen: true,
        message: "Invalid information! Please check the form",
        type: "error",
      });
    }
  };

  useEffect(() => {
    const getProduct = async (id) => {
      try {
        const response = await catalogApi.getProductById(id);
        let array = response.images;
        array.forEach((element, index, newArr) => {
          newArr[index] = process.env.REACT_APP_IMAGE_URL + element;
        });
        setProductInfo({
          id: response.id,
          category: response.category,
          description: response.description,
          name: response.name,
          poster: process.env.REACT_APP_IMAGE_URL + response.poster,
          images: array,
          productDetails: response.productDetails,
          listImageFiles: [],
        });
      } catch (error) {
        setNotify({
          isOpen: true,
          message: "Sorry, Something went wrong",
          type: "error",
        });
      }
    };

    if (props.location.state) {
      getProduct(props.location.state);
    }
    setIsLoading(false);
  }, [props.location.state]);

  return (
    <>
      {isLoading ? (
        <div className="loading">
          <CircularProgress style={{ height: "80px", width: "80px" }} />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="store-product-container">
          <h2 className="store-product-main-title"> Manage product </h2>
          <BasicInformation
            errors={errors}
            productInfo={productInfo}
            onChange={handleInputChange}
            setBasicInformation={setProductInfo}
            setNotify={setNotify}
          />
          <SaleInformation
            errors={errors}
            productInfo={productInfo}
            onChange={handleInputChange}
            actualComponents={actualComponents}
            setActualComponents={setActualComponents}
            setBasicInformation={setProductInfo}
          />
          <div className="store-product-button">
            <Button color="primary" variant="contained" type="submit">
              Submit
            </Button>
          </div>
          <Notification notify={notify} setNotify={setNotify} />
        </form>
      )}
    </>
  );
};

export default StoreProduct;
