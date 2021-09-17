import { useState } from "react";

import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";

import CustomButton from "../../components/custom-button/custom-button.component";
import Modal from "../../components/modal-backdrop/modal.component";
import Backdrop from "../../components/modal-backdrop/backdrop.component";

import { data } from "./data";
import { columns } from "../../components/data-table/columns.data-table";

import "react-data-table-component-extensions/dist/index.css";
import "./manage-account-page.styles.scss";

const ManageAccountPage = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const tableData = {
    columns,
    data,
    export: false,
    print: false,
  };

  const handleAddAdmin = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="main">
      <div className="btn-add-admin">
        <CustomButton onClick={handleAddAdmin}>Add new admin</CustomButton>
      </div>
      <DataTableExtensions {...tableData}>
        <DataTable
          columns={columns}
          data={data}
          defaultSorField="id"
          pagination
          highlightOnHover
        />
      </DataTableExtensions>
      {modalIsOpen && <Modal />}
      {modalIsOpen && <Backdrop onClickCancel={handleCloseModal} />}
    </div>
  );
};

export default ManageAccountPage;
