import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, Tabs, Tab } from "@material-ui/core";

import CustomDialog from "../../../components/dialog/dialog.component";
import Confirm from "../../../components/confirm/confirm.component";
import SellerProductTable from "./data-table/seller-product-table";
import HiddenProductTable from "./data-table/hidden-product-table";
import storeApi from "../../../api/store-api";

import { toggleModal } from "../../../redux/modal/modal.actions";

const StoreManagesProduct = ({ history }) => {
  const [value, setValue] = useState(0);
  const [action, setAction] = useState("");
  const [productId, setProductId] = useState(0);

  const tableRef = useRef(null);

  const currentUser = useSelector((state) => state.user.currentUser);
  const modalIsOpen = useSelector((state) => state.modal.isOpen);

  const dispatch = useDispatch();

  const handleAddProduct = () => {
    history.push("product");
  };

  const handleChange = (event, value) => {
    setValue(value);
  };

  const handleHideProduct = () => {
    const hideProduct = async () => {
      try {
        const response = await storeApi.hideProduct(productId);
        tableRef.current.onQueryChange();
        console.log(response);
      } catch (error) {
        console.log("Failed to hide product: ", error.response);
      }
    };
    hideProduct();
    dispatch(toggleModal());
  };

  const handleShowProduct = () => {
    const showProduct = async () => {
      try {
        const response = await storeApi.showProduct(productId);
        tableRef.current.onQueryChange();
        console.log(response);
      } catch (error) {
        console.log("Failed to show product: ", error.response);
      }
    };
    showProduct();
    dispatch(toggleModal());
  };

  const handleRemoveProduct = () => {
    const removeProduct = async () => {
      try {
        const response = await storeApi.removeProduct(productId);
        tableRef.current.onQueryChange();
        console.log(response);
      } catch (error) {
        console.log("Failed to remove product: ", error.response);
      }
    };
    removeProduct();
    dispatch(toggleModal());
  };

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
        <div>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Product" />
            <Tab label="Hidden Product" />
          </Tabs>
        </div>
      </div>
      <TabPanel value={value} index={0}>
        <SellerProductTable
          tableRef={tableRef}
          currentUser={currentUser}
          actionHideProduct={setAction}
          setProductId={setProductId}
          dispatch={dispatch}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <HiddenProductTable
          tableRef={tableRef}
          currentUser={currentUser}
          actionHideProduct={setAction}
          setProductId={setProductId}
          dispatch={dispatch}
        />
      </TabPanel>
      {action === "hide-product" && (
        <CustomDialog
          title="Hide product"
          open={modalIsOpen}
          dispatch={dispatch}
        >
          <Confirm
            title="Are you sure to hide this product?"
            data={productId}
            onSubmit={handleHideProduct}
          />
        </CustomDialog>
      )}
      {action === "show-product" && (
        <CustomDialog
          title="Show product"
          open={modalIsOpen}
          dispatch={dispatch}
        >
          <Confirm
            title="Are you sure to show this product?"
            data={productId}
            onSubmit={handleShowProduct}
          />
        </CustomDialog>
      )}
      {action === "remove-product" && (
        <CustomDialog
          title="Remove product"
          open={modalIsOpen}
          dispatch={dispatch}
        >
          <Confirm
            title="Are you sure to remove this product?"
            data={productId}
            onSubmit={handleRemoveProduct}
          />
        </CustomDialog>
      )}
    </div>
  );
};

const TabPanel = (props) => {
  const { children, value, index } = props;
  return <div>{value === index && children}</div>;
};

export default StoreManagesProduct;
