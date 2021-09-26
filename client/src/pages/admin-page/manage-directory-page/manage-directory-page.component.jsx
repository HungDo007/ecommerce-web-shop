import { useDispatch, useSelector } from "react-redux";

import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";

import AddDirectoryContainer from "../../../components/directory/add-directory/add-directory.container";
import ConfirmContainer from "../../../components/confirm/confirm.container";
import Backdrop from "../../../components/modal-backdrop/backdrop.component";
import CustomButton from "../../../components/custom-button/custom-button.component";

import { data } from "../../../components/directory/data";
//import { columns } from "../../../components/data-table/columns-directory";
import { toggleModal } from "../../../redux/modal/modal.actions";
import * as FaIcon from "react-icons/fa";
import * as BiIcon from "react-icons/bi";
import { useState } from "react";

const ManageDirectoryPage = () => {
  const [action, setAction] = useState("add-directory");
  const [directoryItem, setDirectoryItem] = useState({
    direcId: 0,
    directTitle: "",
    directImageUrl: "",
  });
  const dispatch = useDispatch();
  const modalIsOpen = useSelector((state) => state.modal.isOpen);
  //const { direcId, directTitle, directImageUrl } = directoryItem;
  const listDirectory = data.sections;
  const title = "title";
  const imageUrl = "imageUrl";
  const hide = null;
  const update = null;

  const columns = [
    {
      name: "Name",
      selector: (row) => row[title],
      sortable: true,
    },
    {
      name: "Image",
      selector: (row) => row[imageUrl],
      cell: (d) => {
        return (
          <div>
            <img
              height={100}
              width={150}
              src={d.imageUrl}
              aria-hidden
              alt="image of directory"
            />
          </div>
        );
      },
    },
    {
      name: "Hide",
      sortable: false,
      selector: (row) => row[hide],
      cell: (d) => [
        <>
          <BiIcon.BiHide
            key={d.id}
            onClick={() => handleHideDirectory(d.id)}
            style={{ cursor: "pointer" }}
          />
        </>,
      ],
    },
    {
      name: "Edit",
      sortable: false,
      selector: (row) => row[update],
      cell: (d) => [
        <>
          <FaIcon.FaEdit
            key={d.id}
            onClick={() => handleDirectory(d.id, d.title, d.imageUrl)}
            style={{ cursor: "pointer" }}
          />
        </>,
      ],
    },
  ];

  const tableData = {
    columns: columns,
    data: listDirectory,
    export: false,
    print: false,
  };

  const handleHideDirectory = (id) => {
    setAction("hide-directory");
    setDirectoryItem({ direcId: id });
    dispatch(toggleModal(true));
  };

  const handleDirectory = (id, title, imageUrl) => {
    setAction("add-directory");
    setDirectoryItem({ id, title, imageUrl });
    dispatch(toggleModal(true));
  };

  console.log("manage-directory-page has re rendered");
  return (
    <div className="main">
      <div className="btn-add-admin">
        <CustomButton onClick={() => handleDirectory()}>
          Add new directory
        </CustomButton>
      </div>
      <DataTableExtensions {...tableData}>
        <DataTable
          columns={columns}
          data={listDirectory}
          defaultSorField="id"
          pagination
          highlightOnHover
          dense
        />
      </DataTableExtensions>
      {modalIsOpen && action === "add-directory" && (
        <AddDirectoryContainer item={directoryItem} />
      )}
      {modalIsOpen && action === "hide-directory" && (
        <ConfirmContainer id={directoryItem.direcId} />
      )}
      {modalIsOpen && <Backdrop />}
    </div>
  );
};

export default ManageDirectoryPage;
