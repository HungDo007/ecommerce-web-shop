import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";

import AddComponentToDirectoryContainer from "../../../components/directory/add-directory/add-component-to-directory/add-component-to-directory.container";
import AddDirectoryContainer from "../../../components/directory/add-directory/add-directory.container";
import Backdrop from "../../../components/modal-backdrop/backdrop.component";
import ConfirmContainer from "../../../components/confirm/confirm.container";
import CustomButton from "../../../components/custom-button/custom-button.component";

import { toggleModal } from "../../../redux/modal/modal.actions";

import * as MdIcon from "react-icons/md";
import * as FaIcon from "react-icons/fa";

import catalogApi from "../../../api/catalog";
import adminApi from "../../../api/admin-api";

const ManageDirectoryPage = () => {
  const [action, setAction] = useState("add-directory");
  const [directoryItem, setDirectoryItem] = useState({
    direcId: 0,
    directTitle: "",
    directImageUrl: "",
  });
  const dispatch = useDispatch();
  const modalIsOpen = useSelector((state) => state.modal.isOpen);
  const name = "name";
  const imageUrl = "image";
  const update = null;
  const addComponent = null;
  const remove = null;

  const [directoryList, setDirectoryList] = useState([]);
  useEffect(() => {
    const fetchDirectoryList = async () => {
      try {
        const response = await catalogApi.getAllDirectory();
        setDirectoryList(response);
      } catch (error) {
        console.log("Failed to fetch component list: ", error);
      }
    };

    fetchDirectoryList();
  }, []);

  const columns = [
    {
      name: "Name",
      selector: (row) => row[name],
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
              src={process.env.REACT_APP_IMAGE_URL + d.image}
              aria-hidden
              alt="image of directory"
            />
          </div>
        );
      },
    },
    {
      name: "Edit",
      sortable: false,
      selector: (row) => row[update],
      cell: (d) => [
        <>
          <FaIcon.FaEdit
            key={d.id}
            onClick={() => handleDirectory(d.id, d.name, d.image)}
            style={{ cursor: "pointer" }}
          />
        </>,
      ],
    },
    {
      name: "Add Component",
      sortable: false,
      selector: (row) => row[addComponent],
      cell: (d) => [
        <>
          <MdIcon.MdAddCircle
            key={d.id}
            onClick={() => handleAddComponent(d.id)}
            style={{ cursor: "pointer" }}
          />
        </>,
      ],
    },
    {
      name: "Remove",
      sortable: false,
      selector: (row) => row[remove],
      cell: (d) => [
        <>
          <MdIcon.MdDelete
            key={d.id}
            onClick={() => handleRemoveDirectory(d.id)}
            style={{ cursor: "pointer" }}
          />
        </>,
      ],
    },
  ];

  const tableData = {
    columns: columns,
    data: directoryList,
    export: false,
    print: false,
  };

  const handleAddComponent = (id) => {
    setAction("add-component-to-directory");
    setDirectoryItem({ direcId: id });
    dispatch(toggleModal());
  };

  const handleRemoveDirectory = (id) => {
    setAction("hide-directory");
    setDirectoryItem({ direcId: id });
    dispatch(toggleModal());
  };

  const handleDirectory = (id, name, imageUrl) => {
    setAction("add-directory");
    setDirectoryItem({ id, name, imageUrl });
    dispatch(toggleModal());
  };

  const handleSubmitRemove = () => {
    const removeDirectory = async () => {
      try {
        const response = await adminApi.removeDirectory(directoryItem.direcId);
        console.log(response);
      } catch (error) {
        console.log("Failed to remove directory: ", error);
      }
    };
    removeDirectory();
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
          data={directoryList}
          defaultSorField="id"
          pagination
          highlightOnHover
          dense
        />
      </DataTableExtensions>
      {modalIsOpen && action === "add-directory" && (
        <AddDirectoryContainer item={directoryItem} />
      )}
      {modalIsOpen && action === "add-component-to-directory" && (
        <AddComponentToDirectoryContainer item={directoryItem} />
      )}
      {modalIsOpen && action === "hide-directory" && (
        <ConfirmContainer
          title="Are you sure to hide this item?"
          onSubmit={handleSubmitRemove}
        />
      )}
      {modalIsOpen && <Backdrop />}
    </div>
  );
};

export default ManageDirectoryPage;
