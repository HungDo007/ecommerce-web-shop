import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Tab, Tabs } from "@material-ui/core";

import CustomDialog from "../../../components/dialog/dialog.component";
import Confirm from "../../../components/confirm/confirm.component";
import ProductTable from "./data-table/product-table";
import LockedProductTable from "./data-table/locked-product-table";

import { toggleModal } from "../../../redux/modal/modal.actions";

import adminApi from "../../../api/admin-api";

const ManageProductPage = () => {
  const [value, setValue] = useState(0);
  const [action, setAction] = useState("");
  const [productId, setProductId] = useState(0);

  const modalIsOpen = useSelector((state) => state.modal.isOpen);

  const dispatch = useDispatch();

  const handleChange = (event, value) => {
    setValue(value);
  };

  const handleUnlockProduct = () => {
    const unlockProduct = async () => {
      try {
        const response = await adminApi.unlockProduct(productId);
        console.log(response);
      } catch (error) {
        console.log("Failed to unlock account: ", error.response);
      }
    };
    unlockProduct();
    dispatch(toggleModal());
  };

  return (
    <div className="manage-account-block">
      <div className="manage-account-header">
        <div>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Product" />
            <Tab label="Locked Product" />
          </Tabs>
        </div>
      </div>
      <TabPanel value={value} index={0}>
        <ProductTable
          actionLockProduct={setAction}
          setProductId={setProductId}
          dispatch={dispatch}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <LockedProductTable
          actionLockProduct={setAction}
          setProductId={setProductId}
          dispatch={dispatch}
        />
      </TabPanel>
      {action === "lock-product" && (
        <CustomDialog
          title="Lock product"
          open={modalIsOpen}
          dispatch={dispatch}
        >
          <Confirm
            title="Are you sure to lock this product?"
            data={productId}
          />
        </CustomDialog>
      )}
      {action === "unlock-product" && (
        <CustomDialog
          title="Unlock product"
          open={modalIsOpen}
          dispatch={dispatch}
        >
          <Confirm
            title="Are you sure to unlock this product?"
            data={productId}
            onSubmit={handleUnlockProduct}
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

export default ManageProductPage;
