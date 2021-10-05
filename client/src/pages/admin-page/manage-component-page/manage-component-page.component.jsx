import * as FaIcon from "react-icons/fa";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";

import Backdrop from "../../../components/modal-backdrop/backdrop.component";
import ConfirmContainer from "../../../components/confirm/confirm.container";
import CustomButton from "../../../components/custom-button/custom-button.component";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toggleModal } from "../../../redux/modal/modal.actions";
import { useEffect, useState } from "react";
import AddComponentContainer from "../../../components/component-classify/add-component.container";
import adminApi from "../../../api/admin-api";

const ManageComponentPage = () => {
  const name = "name";
  const update = null;
  const deleteCompo = null;

  const [componentList, setComponentList] = useState([]);
  useEffect(() => {
    const fetchComponentList = async () => {
      try {
        const response = await adminApi.getAllComponent();
        setComponentList(response);
      } catch (error) {
        console.log("Failed to fetch component list: ", error);
      }
    };

    fetchComponentList();
  }, []);

  const columns = [
    {
      name: "Name",
      selector: (row) => row[name],
      sortable: true,
    },
    {
      name: "Edit",
      sortable: false,
      selector: (row) => row[update],
      cell: (d) => [
        <>
          <FaIcon.FaEdit
            key={d.id}
            onClick={() => handleCompo(d.id, d.name)}
            style={{ cursor: "pointer" }}
          />
        </>,
      ],
    },
    {
      name: "Delete",
      sortable: false,
      selector: (row) => row[deleteCompo],
      cell: (d) => [
        <>
          <FaIcon.FaLock
            key={d.id}
            onClick={() => handleDeleteCompo(d.id)}
            style={{ cursor: "pointer" }}
          />
        </>,
      ],
    },
  ];

  const tableData = {
    columns,
    data: componentList,
    export: false,
    print: false,
  };

  const [componentItem, setComponentItem] = useState({
    compoId: 0,
    compoName: "",
  });

  const [action, setAction] = useState("add-compo");
  const dispatch = useDispatch();
  const modalIsOpen = useSelector((state) => state.modal.isOpen);

  const handleDeleteCompo = (id) => {
    setAction("delete-compo");
    setComponentItem({ compoId: id });
    dispatch(toggleModal());
  };

  const handleCompo = (id, name) => {
    setAction("add-compo");
    dispatch(toggleModal());
    setComponentItem({ id, name });
  };

  console.log("manage-component-page has re rendered");
  return (
    <div className="main">
      <div className="btn-add-admin">
        <CustomButton onClick={() => handleCompo()}>
          Add new component
        </CustomButton>
      </div>
      <DataTableExtensions {...tableData}>
        <DataTable
          columns={columns}
          data={componentList}
          defaultSorField="id"
          pagination
          highlightOnHover
        />
      </DataTableExtensions>
      {modalIsOpen && action === "add-compo" && (
        <AddComponentContainer item={componentItem} />
      )}
      {modalIsOpen && action === "delete-compo" && (
        <ConfirmContainer title="Are you sure to delete this component?" />
      )}
      {modalIsOpen && <Backdrop />}
    </div>
  );
};

export default ManageComponentPage;
