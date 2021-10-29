import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import EditIcon from "@material-ui/icons/Edit";
import { Button } from "@material-ui/core";
import MaterialTable from "material-table";

import catalogApi from "../../../api/catalog-api";

const StoreManagesProduct = ({ history }) => {
  const [productList, setProductList] = useState([]);

  const currentUser = useSelector((state) => state.user.currentUser);

  const columns = [
    {
      title: "Name",
      field: "name",
    },
    {
      title: "Image",
      field: "poster",
      render: (rowData) => (
        <img
          height="100"
          width="150"
          style={{ objectFit: "cover" }}
          src={process.env.REACT_APP_IMAGE_URL + rowData.poster}
          aria-hidden
          alt="image of directory"
        />
      ),
    },
  ];

  const handleAddProduct = () => {
    history.push("product");
  };

  const handleEditProduct = (event, rowData) => {
    // history.push(`product/${rowData.id}`);
    // history.push({
    //   pathname: "product",
    //   state: rowData.id,
    // });
    console.log(rowData);
  };

  useEffect(() => {
    const getProductsOfStore = async () => {
      try {
        const response = await catalogApi.getAllProductOfStore(
          currentUser.unique_name
        );
        setProductList(response);
        console.log(response);
      } catch (error) {
        console.log("Failed to get products of store: ", error);
      }
    };

    getProductsOfStore();
  }, []);

  return (
    <div className="manage-account-block">
      <div className="manage-account-header">
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
      <MaterialTable
        options={{ actionsColumnIndex: -1 }}
        title="Product"
        data={productList}
        columns={columns}
        actions={[
          {
            icon: EditIcon,
            tooltip: "Edit product",
            onClick: (event, rowData) => {
              handleEditProduct(event, rowData);
            },
          },
        ]}
      />
    </div>
  );
};

export default StoreManagesProduct;
