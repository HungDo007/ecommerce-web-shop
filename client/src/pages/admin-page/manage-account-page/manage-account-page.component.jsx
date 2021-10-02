import axios from "axios";
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

const ManageAccountPage = () => {
  const [listUser, setListUser] = useState([]);
  const [action, setAction] = useState("sign-up");
  const [userId, setUserID] = useState(0);
  const currentUser = useSelector((state) => state.user.currentUser);
  const modalIsOpen = useSelector((state) => state.modal.isOpen);
  const dispatch = useDispatch();

  const username = "username";
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
      name: "Action",
      sortable: false,
      selector: (row) => row[lockAction],
      cell: (d) => [
        <>
          <FaIcon.FaLock
            key={d.id}
            onClick={() => handleLockAccount(d.id)}
            style={{ cursor: "pointer" }}
          />
        </>,
      ],
    },
  ];

  const tableData = {
    columns,
    data: listUser,
    export: false,
    print: false,
  };

  const handleAddAdmin = () => {
    setAction("sign-up");
    dispatch(toggleModal());
  };

  const handleLockAccount = (id) => {
    setUserID(id);
    setAction("lock-user");
    dispatch(toggleModal());
  };

  const getListUser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/Admins/allUser",
        { headers: { Authorization: "Bearer " + currentUser.jwtToken } }
      );
      setListUser(response.data);
      //listUser = response.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getListUser();
  }, []);

  console.log(listUser);
  return (
    <div className="main">
      <div className="btn-add-admin">
        <CustomButton onClick={handleAddAdmin}>Add new admin</CustomButton>
      </div>
      <DataTableExtensions {...tableData}>
        <DataTable
          columns={columns}
          data={listUser}
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
          id={userId}
          title="Are you sure to lock this account?"
        />
      )}
      {modalIsOpen && <Backdrop />}
    </div>
  );
};

export default ManageAccountPage;
