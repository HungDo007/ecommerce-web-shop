import { useEffect, useState } from "react";
import CustomButton from "../../../../components/custom-button/custom-button.component";
import "./store-product.styles.scss";
import BasicInformation from "./basic-information/basic-info.component";
import SaleInformation from "./sale-information/sale-info.component";
import { useSelector } from "react-redux";
import storeApi from "../../../../api/store-api";
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

  const currentUser = useSelector((state) => state.user.currentUser);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();

    for (let i = 0; i < productInfo.listImageFiles.length; i++) {
      formData.append("images", productInfo.listImageFiles[i]);
    }

    for (let i = 0; i < productInfo.productDetail.length; i++) {
      formData.append("details", JSON.stringify(productInfo.productDetail[i]));
      //console.log(JSON.stringify(productInfo.productDetail[i]));
    }

    formData.append("seller", currentUser.unique_name);
    formData.append("name", productInfo.name);
    formData.append("description", productInfo.description);
    formData.append("categories", productInfo.directoryId);
    formData.append("poster", productInfo.thumbnailFile);

    // for (let i = 0; i < productInfo.productDetail.length; i++) {
    //   const formDetail = new FormData();
    //   formDetail.append("price", productInfo.productDetail[i].price);
    //   formDetail.append("stock", productInfo.productDetail[i].stock);

    //   for (
    //     let j = 0;
    //     j < productInfo.productDetail[i].componentDetails.length;
    //     j++
    //   ) {
    //     const formCompo = new FormData();
    //     formCompo.append(
    //       "compId",
    //       productInfo.productDetail[i].componentDetails[j].compId
    //     );
    //     formCompo.append(
    //       "value",
    //       productInfo.productDetail[i].componentDetails[j].value
    //     );
    //     formDetail.append("componentDetails", formCompo);
    //   }
    //   formData.append("details", formDetail);
    // }
    //formData.append("details", productInfo.productDetail);

    const addProduct = async () => {
      try {
        const response = await storeApi.addProduct(formData);
        console.log(response);
      } catch (error) {
        console.log("Failed to add product: ", error);
      }
    };

    //addProduct();
    console.log(productInfo);
  };

  // const productDetail = [
  //   {
  //     stock: 10,
  //     price: 10,
  //     componentDetails: [
  //       {
  //         compId: 1,
  //         value: "Red",
  //       },
  //       {
  //         compId: 2,
  //         value: "S",
  //       },
  //     ],
  //   },
  //   {
  //     stock: 14,
  //     price: 13,
  //     componentDetails: [
  //       {
  //         compId: 1,
  //         value: "Red",
  //       },
  //       {
  //         compId: 2,
  //         value: "L",
  //       },
  //     ],
  //   },
  // ];
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
