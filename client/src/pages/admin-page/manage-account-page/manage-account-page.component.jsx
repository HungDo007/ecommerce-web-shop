import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";

import Backdrop from "../../../components/modal-backdrop/backdrop.component";
import CustomButton from "../../../components/custom-button/custom-button.component";
import SignUpContainer from "../../../components/sign-up/sign-up.container";

import { columns } from "../../../components/data-table/columns.data-table";
import { toggleModal } from "../../../redux/modal/modal.actions";

import "react-data-table-component-extensions/dist/index.css";
import "./manage-account-page.styles.scss";

const ManageAccountPage = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const modalIsOpen = useSelector((state) => state.modal.isOpen);
  const dispatch = useDispatch();
  const [listUser, setListUser] = useState([]);

  const tableData = {
    columns,
    data: listUser,
    export: false,
    print: false,
  };

  const handleAddAdmin = () => {
    dispatch(toggleModal(true));
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
      {modalIsOpen && <SignUpContainer />}
      {modalIsOpen && <Backdrop />}
    </div>
  );
};

export default ManageAccountPage;
