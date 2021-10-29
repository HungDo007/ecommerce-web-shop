import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import BasicInformation from "./basic-information/basic-info.component";
import SaleInformation from "./sale-information/sale-info.component";

import storeApi from "../../../../api/store-api";

import "./store-product.styles.scss";
import catalogApi from "../../../../api/catalog-api";
import { Button } from "@material-ui/core";

const defaultImg = "/img/default-img.png";

const StoreProduct = (props) => {
  const [productInfo, setProductInfo] = useState({
    directoryId: 0,
    name: "",
    description: "",
    poster: defaultImg,
    thumbnailFile: null,
    images: new Array(4).fill(defaultImg),
    listImageFiles: [],
    productDetail: [{ price: 0, stock: 0, componentDetails: [] }],
  });

  const { thumbnailFile, productDetail } = productInfo;

  const [errors, setErrors] = useState({});
  // const [productId, setProductId] = useState(0);
  const [actualComponents, setActualComponents] = useState([]);

  const currentUser = useSelector((state) => state.user.currentUser);

  // useEffect(() => {

  //   addDetail();
  // }, [productId]);

  const validateBasicInfo = (fieldValues = productInfo) => {
    let temp = { ...errors };
    if ("name" in fieldValues)
      temp.name = fieldValues.name ? "" : "This field is required";
    if ("description" in fieldValues)
      temp.description = fieldValues.description
        ? ""
        : "This field is required";
    if ("directoryId" in fieldValues)
      temp.directoryId =
        fieldValues.directoryId != 0 ? "" : "This field is required";

    // if ("price" in fieldValues.productDetail[0])
    //   temp.price = fieldValues.price ? "" : "This field is required";
    setErrors({ ...temp });

    if (fieldValues === productInfo)
      return Object.values(temp).every((x) => x === "");
  };

  const validate = (field = productDetail) => {
    let temp = { ...errors };
    productDetail.forEach((element, index) => {
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
    // const { name, value } = event.target;
    if (name === "name" || name === "description" || name === "directoryId") {
      setProductInfo({ ...productInfo, [name]: value });
      validateBasicInfo({ [name]: value });
    } else {
      const list = [...productDetail];
      // list[0][name] = value;
      // setProductInfo({ ...productInfo, productDetail: list });
      // validate({ productDetail: value });
      if (name !== "price" && name !== "stock") {
        list[index].componentDetails = actualComponents.map((item) => ({
          compId: item.id,
          value:
            item.name === name
              ? value
              : list[index].componentDetails.length > 0
              ? list[index].componentDetails.find((i) => i.compId === item.id)
                  .value
              : "",
        }));
      } else {
        list[index][name] = value;
      }
      validate({ productDetail: value });
      setProductInfo({ ...productInfo, productDetail: list });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateBasicInfo() && validate() && thumbnailFile !== null) {
      const formData = new FormData();

      formData.append("seller", currentUser.unique_name);
      formData.append("name", productInfo.name);
      formData.append("description", productInfo.description);
      formData.append("categories", productInfo.directoryId);
      formData.append("poster", productInfo.thumbnailFile);
      for (let i = 0; i < productInfo.listImageFiles.length; i++) {
        formData.append("images", productInfo.listImageFiles[i]);
      }

      const addDetail = async (productId) => {
        try {
          const response = await storeApi.addDetail(
            productId,
            productInfo.productDetail
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
      addProduct();
      //alert("submit");
      //console.log(productInfo);
    } else {
      console.log("not validate");
    }
  };

  useEffect(() => {
    const getProduct = async (id) => {
      try {
        const response = await catalogApi.getProductById(id);
        console.log(response);
        setProductInfo(response);
      } catch (error) {
        console.log("Failed to get product: ", error);
      }
    };

    if (props.location.state) {
      console.log(props);
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
