import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import * as FaIcon from "react-icons/fa";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";

import Backdrop from "../../../components/modal-backdrop/backdrop.component";
import ConfirmContainer from "../../../components/confirm/confirm.container";
import CustomButton from "../../../components/custom-button/custom-button.component";
import SignUpContainer from "../../../components/sign-up/sign-up.container";

import { toggleModal } from "../../../redux/modal/modal.actions";

import "react-data-table-component-extensions/dist/index.css";
import "./manage-account-page.styles.scss";
import adminApi from "../../../api/admin-api";

const ManageAccountPage = () => {
  const [listData, setListData] = useState([]);
  const [action, setAction] = useState("sign-up");
  const [username, setUsername] = useState("");
  const currentUser = useSelector((state) => state.user.currentUser);
  const modalIsOpen = useSelector((state) => state.modal.isOpen);
  const dispatch = useDispatch();

  const firstName = "firstName";
  const email = "email";
  const address = "address";
  const lockAction = null;

  const columns = [
    {
      name: "Username",
      selector: (row) => row[username],
      sortable: true,
      cell: (d) => (
        <a href="#" target="_blank" rel="noreferrer">
          {d.username}
        </a>
      ),
    },
    {
      name: "Name",
      selector: (row) => row[firstName],
      sortable: true,
      cell: (d) => (
        <span>
          {d.firstName} {d.lastName}
        </span>
      ),
    },
    {
      name: "Email",
      selector: (row) => row[email],
      sortable: true,
    },
    {
      name: "Address",
      selector: (row) => row[address],
      sortable: true,
    },
    {
      name: "Lock",
      sortable: false,
      selector: (row) => row[lockAction],
      cell: (d) => [
        <>
          <FaIcon.FaLock
            key={d.id}
            onClick={() => handleLockAccount(d.username)}
            style={{ cursor: "pointer" }}
          />
        </>,
      ],
    },
  ];

  const tableData = {
    columns,
    data: listData,
    export: false,
    print: false,
  };

  const handleAddAdmin = () => {
    setAction("sign-up");
    dispatch(toggleModal());
  };

  const handleLockAccount = (username) => {
    setUsername(username);
    setAction("lock-user");
    dispatch(toggleModal());
  };

  const fetchListAdmin = async () => {
    try {
      const response = await adminApi.getAllAdmin();
      setListData(response);
    } catch (error) {
      console.log("Failed to fetch list: ", error);
    }
  };

  const showNotification = useSelector(
    (state) => state.modal.notificationIsOpen
  );
  useEffect(() => {
    fetchListAdmin();
  }, [showNotification]);

  const handleFetchAdmin = () => {
    fetchListAdmin();
  };

  const handleFetchUser = () => {
    const fetchListUser = async () => {
      try {
        const response = await adminApi.getAllUser();
        setListData(response);
      } catch (error) {
        console.log("Failed to fetch list: ", error);
      }
    };

    fetchListUser();
  };

  const handleFetchLockedUser = () => {
    const fetchListLockedUser = async () => {
      try {
        const response = await adminApi.getAllLockedUser();
        setListData(response);
      } catch (error) {
        console.log("Failed to fetch list: ", error);
      }
    };

    fetchListLockedUser();
  };

  return (
    <div className="main">
      <div className="account-page-buttons">
        <div className="account-page-navigate">
          <CustomButton isGoogleSignIn onClick={handleFetchAdmin}>
            All Admin
          </CustomButton>
          <CustomButton onClick={handleFetchUser}>All User</CustomButton>
          <CustomButton onClick={handleFetchLockedUser}>
            Locked User
          </CustomButton>
        </div>
        <div>
          <CustomButton onClick={handleAddAdmin}>Add new admin</CustomButton>
        </div>
      </div>
      <DataTableExtensions {...tableData}>
        <DataTable
          columns={columns}
          defaultSorField="id"
          pagination
          highlightOnHover
        />
      </DataTableExtensions>
      {modalIsOpen && action === "sign-up" && (
        <SignUpContainer currentUser={currentUser} />
      )}
      {modalIsOpen && action === "lock-user" && (
        <ConfirmContainer
          data={username}
          title="Are you sure to lock this account?"
        />
      )}
      {modalIsOpen && <Backdrop />}
    </div>
  );
};

export default ManageAccountPage;
