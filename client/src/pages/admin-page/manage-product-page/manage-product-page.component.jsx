import MaterialTable from "material-table";
import { useState } from "react";
const defaultImg = "/img/default-img.png";

const ManageProductPage = () => {
  const [productList, setProductList] = useState([]);

  const columns = [
    {
      title: "Name",
      field: "name",
    },
    {
      title: "Image",
      field: "poster",
      render: (rowData) =>
        rowData.poster ? (
          <img
            height="100"
            width="150"
            style={{ objectFit: "cover" }}
            src={process.env.REACT_APP_IMAGE_URL + rowData.poster}
            aria-hidden
            alt="image of directory"
          />
        ) : (
          <img
            height="100"
            width="150"
            style={{ objectFit: "cover" }}
            src={defaultImg}
            aria-hidden
            alt="image of directory"
          />
        ),
    },
    {
      title: "Seller",
      field: "seller",
    },
    {
      title: "Date Created",
      field: "dateCreated",
    },
  ];
  return (
    <div className="manage-account-block">
      <MaterialTable title="Product" columns={columns} data={productList} />
    </div>
  );
};

export default ManageProductPage;
