import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Button, Tab, Tabs } from "@material-ui/core";

import AdminTable from "./data-table/admin-table";
import Confirm from "../../../components/confirm/confirm.component";
import CustomDialog from "../../../components/dialog/dialog.component";
import LockedUserTable from "./data-table/locked-user-table";
import UserTable from "./data-table/user-table";
import SignUp from "../../../components/sign-up/sign-up.component";

import { toggleModal } from "../../../redux/modal/modal.actions";

import "./manage-account-page.styles.scss";

const ManageAccountPage = () => {
  const [value, setValue] = useState(0);
  const [action, setAction] = useState("");
  const [username, setUsername] = useState("");

  const modalIsOpen = useSelector((state) => state.modal.isOpen);
  const dispatch = useDispatch();

  const handleChange = (event, value) => {
    setValue(value);
  };

  const handleDialog = () => {
    setAction("sign-up");
    dispatch(toggleModal());
  };

  return (
    <div className="manage-account-block">
      <div className="manege-account-header">
        <div>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="All Admins" />
            <Tab label="All Users" />
            <Tab label="Locked Users" />
          </Tabs>
        </div>
        <div>
          <Button
            variant="contained"
            onClick={handleDialog}
            style={{
              borderRadius: 24,
              backgroundColor: "rgb(45 42 212)",
              padding: "10px 26px",
              fontSize: "14px",
              color: "white",
            }}
          >
            Add new admin
          </Button>
        </div>
      </div>
      <TabPanel value={value} index={0}>
        <AdminTable />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <UserTable actionLockUser={setAction} setUsername={setUsername} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <LockedUserTable />
      </TabPanel>
      {action === "sign-up" && (
        <CustomDialog
          title="Add new admin"
          open={modalIsOpen}
          dispatch={dispatch}
        >
          <SignUp />
        </CustomDialog>
      )}
      {action === "lock-user" && (
        <CustomDialog
          title="Lock user account"
          open={modalIsOpen}
          dispatch={dispatch}
        >
          <Confirm title="Are you sure to lock this account?" data={username} />
        </CustomDialog>
      )}
    </div>
  );
};

const TabPanel = (props) => {
  const { children, value, index } = props;
  return <div>{value === index && children}</div>;
};

export default ManageAccountPage;
