import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@material-ui/core";

import BasicInformation from "./basic-information/basic-info.component";
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
    productDetails: [{ price: 0, stock: 0, componentDetails: [] }],
  });
  const [errors, setErrors] = useState({});
  const [actualComponents, setActualComponents] = useState([]);

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
      temp.category = fieldValues.category != 0 ? "" : "This field is required";

    // if ("price" in fieldValues.productDetails[0])
    //   temp.price = fieldValues.price ? "" : "This field is required";

    // if ("productDetails" in fieldValues) {
    //   productDetails.forEach((element) => {
    //     if ("price" in element) {
    //       // temp.price = [];
    //       temp.price =
    //         element.price > 0 ? "" : "The price must be greater than 0 ";
    //     }
    //     if ("stock" in element) {
    //       // temp.stock = [];
    //       temp.stock =
    //         element.stock > 0 ? "" : "The stock must be greater than 0 ";
    //     }
    //     if (element.componentDetails.length < actualComponents.length) {
    //       temp.component = "This field is required";
    //     } else {
    //       element.componentDetails.forEach((item) => {
    //         if ("value" in item) {
    //           temp.component = item.value ? "" : "This field is required";
    //         }
    //       });
    //     }
    //   });
    // }

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

    if (validateBasicInfo() && validate() && thumbnailFile !== null) {
      const formData = new FormData();

      formData.append("seller", currentUser.unique_name);
      formData.append("name", productInfo.name);
      formData.append("description", productInfo.description);
      formData.append("categories", productInfo.category);
      formData.append("poster", productInfo.thumbnailFile);
      if (productInfo.listImageFiles) {
        for (let i = 0; i < productInfo.listImageFiles.length; i++) {
          formData.append("images", productInfo.listImageFiles[i]);
        }
      }

      const addDetail = async (productId) => {
        try {
          const response = await storeApi.addDetail(
            productId,
            productInfo.productDetails
          );
          console.log(response);
        } catch (error) {
          console.log("Failed to add detail: ", error.response);
        }
      };

      const addProduct = async () => {
        try {
          const productId = await storeApi.addProduct(formData);
          // setProductId(response);
          addDetail(productId);
        } catch (error) {
          console.log("Failed to add product: ", error);
        }
      };
      //addProduct();
      alert("submit");
      console.log(productInfo);
    } else {
      console.log("not validate");
    }
  };

  useEffect(() => {
    const getProduct = async (id) => {
      try {
        const response = await catalogApi.getProductById(id);
        console.log(response);
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
        console.log("Failed to get product: ", error);
      }
    };

    if (props.location.state) {
      getProduct(props.location.state);
    }
  }, []);

  return (
    <form onSubmit={handleSubmit} className="app">
      <h2 className="store-product-main-title"> Add product </h2>
      <hr />
      <BasicInformation
        errors={errors}
        onChange={handleInputChange}
        productInfo={productInfo}
        setBasicInformation={setProductInfo}
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
        <Button
          className="store-product-button-submit"
          variant="contained"
          type="submit"
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default StoreProduct;
