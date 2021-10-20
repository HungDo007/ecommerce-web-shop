import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import CustomButton from "../../../../components/custom-button/custom-button.component";
import BasicInformation from "./basic-information/basic-info.component";
import SaleInformation from "./sale-information/sale-info.component";

import storeApi from "../../../../api/store-api";

import "./store-product.styles.scss";

const defaultImg = "/img/default-img.png";

const StoreProduct = () => {
  const [productInfo, setProductInfo] = useState({
    directoryId: 0,
    name: "",
    description: "",
    thumbnailUrl: defaultImg,
    thumbnailFile: null,
    listImageUrls: new Array(4).fill(defaultImg),
    listImageFiles: [],
    productDetail: [{ price: 0, stock: 0, componentDetails: [] }],
  });

  const [productId, setProductId] = useState(0);

  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const addDetail = async () => {
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

    addDetail();
  }, [productId]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("seller", currentUser.unique_name);
    formData.append("name", productInfo.name);
    formData.append("description", productInfo.description);
    formData.append("categories", productInfo.directoryId);
    formData.append("poster", productInfo.thumbnailFile);
    for (let i = 0; i < productInfo.listImageFiles.length; i++) {
      formData.append("images", productInfo.listImageFiles[i]);
    }

    const addProduct = async () => {
      try {
        const response = await storeApi.addProduct(formData);
        setProductId(response);
      } catch (error) {
        console.log("Failed to add product: ", error);
      }
    };

    addProduct();
  };

  return (
    <form onSubmit={handleSubmit} className="app">
      <h2 className="store-product-main-title"> Add product </h2>
      <hr />
      <BasicInformation
        productInfo={productInfo}
        setBasicInformation={setProductInfo}
      />
      <SaleInformation
        productInfo={productInfo}
        setBasicInformation={setProductInfo}
      />
      <CustomButton type="submit">Submit</CustomButton>
    </form>
  );
};

export default StoreProduct;
