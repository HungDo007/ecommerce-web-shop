import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Button, Tab, Tabs } from "@material-ui/core";

import Notification from "../../../components/notification/notification.component";
import AdminTable from "./data-table/admin-table";
import Confirm from "../../../components/confirm/confirm.component";
import CustomDialog from "../../../components/dialog/dialog.component";
import LockedUserTable from "./data-table/locked-user-table";
import UserTable from "./data-table/user-table";
import SignUp from "../../../components/sign-up/sign-up.component";

import { toggleModal } from "../../../redux/modal/modal.actions";

import "./manage-account-page.styles.scss";
import adminApi from "../../../api/admin-api";

const ManageAccountPage = () => {
  const [value, setValue] = useState(0);
  const [action, setAction] = useState("");
  const [username, setUsername] = useState("");
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const tableRef = useRef(null);

  const modalIsOpen = useSelector((state) => state.modal.isOpen);
  const currentUser = useSelector((state) => state.user.currentUser);

  const dispatch = useDispatch();

  const handleChange = (event, value) => {
    setValue(value);
  };

  const handleDialog = () => {
    setAction("sign-up");
    dispatch(toggleModal());
  };

  const handleUnlockAccount = () => {
    const unlockAccount = async () => {
      try {
        const response = await adminApi.unlockAccount({ username: username });
        if (response.status === 200 && response.statusText === "OK") {
          tableRef.current.onQueryChange();
        }
      } catch (error) {
        console.log("Failed to unlock account: ", error);
        setNotify({
          isOpen: true,
          message: `Fail to unlock account!`,
          type: "error",
        });
      }
    };
    unlockAccount();
    dispatch(toggleModal());
  };

  return (
    <div className="manage-account-block">
      <div className="manage-account-header">
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
        <AdminTable tableRef={tableRef} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <UserTable
          tableRef={tableRef}
          actionLockUser={setAction}
          setUsername={setUsername}
          dispatch={dispatch}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <LockedUserTable
          tableRef={tableRef}
          actionLockUser={setAction}
          setUsername={setUsername}
          dispatch={dispatch}
        />
      </TabPanel>
      {action === "sign-up" && (
        <CustomDialog
          title="Add new admin"
          open={modalIsOpen}
          dispatch={dispatch}
        >
          <SignUp currentUser={currentUser} tableRef={tableRef} />
        </CustomDialog>
      )}
      {action === "lock-user" && (
        <CustomDialog
          title="Lock user account"
          open={modalIsOpen}
          dispatch={dispatch}
        >
          <Confirm
            title="Are you sure to lock this account?"
            data={username}
            tableRef={tableRef}
          />
        </CustomDialog>
      )}
      {action === "unlock-user" && (
        <CustomDialog
          title="Unlock user account"
          open={modalIsOpen}
          dispatch={dispatch}
        >
          <Confirm
            title="Are you sure to unlock this account?"
            data={username}
            onSubmit={handleUnlockAccount}
          />
        </CustomDialog>
      )}
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
};

const TabPanel = (props) => {
  const { children, value, index } = props;
  return <div>{value === index && children}</div>;
};

export default ManageAccountPage;
