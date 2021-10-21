import { Button } from "@material-ui/core";
import MaterialTable from "material-table";
import { useEffect } from "react";
import { useState } from "react";

const StoreManagesProduct = ({ history }) => {
  const [productList, setProductList] = useState([]);

  const columns = [
    {
      title: "Name",
      field: "name",
    },
    {
      title: "Image",
      field: "image",
      render: (rowData) => (
        <img
          height="100"
          width="150"
          style={{ objectFit: "cover" }}
          src={process.env.REACT_APP_IMAGE_URL + rowData.image}
          aria-hidden
          alt="image of directory"
        />
      ),
    },
    {
      title: "Directory",
      field: "directory",
    },
  ];

  const handleAddProduct = () => {
    history.push("product");
  };

  return (
    <div className="main">
      <div className="btn-add-admin">
        <Button
          variant="contained"
          onClick={handleAddProduct}
          style={{
            borderRadius: 24,
            backgroundColor: "rgb(45 42 212)",
            padding: "10px 26px",
            fontSize: "14px",
            color: "white",
          }}
        >
          Add new product
        </Button>
      </div>
      <MaterialTable data={productList} columns={columns} />
    </div>
  );
};

export default StoreManagesProduct;
