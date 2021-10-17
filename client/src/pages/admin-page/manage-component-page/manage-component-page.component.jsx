import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { toggleModal } from "../../../redux/modal/modal.actions";

import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";

import * as FaIcon from "react-icons/fa";
import * as MdIcon from "react-icons/md";

import AddComponentContainer from "../../../components/component-classify/add-component.container";
import Backdrop from "../../../components/modal-backdrop/backdrop.component";
import ConfirmContainer from "../../../components/confirm/confirm.container";
import CustomButton from "../../../components/custom-button/custom-button.component";
import Notification from "../../../components/notification/notification.component";

import adminApi from "../../../api/admin-api";

const ManageComponentPage = () => {
  const name = "name";
  const update = null;
  const remove = null;

  const [componentList, setComponentList] = useState([]);
  const [componentItem, setComponentItem] = useState({
    compoId: 0,
    compoName: "",
  });

  const [action, setAction] = useState("add-compo");
  const dispatch = useDispatch();
  const modalIsOpen = useSelector((state) => state.modal.isOpen);
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
      name: "Remove",
      sortable: false,
      selector: (row) => row[remove],
      cell: (d) => [
        <>
          <MdIcon.MdDelete
            key={d.id}
            onClick={() => handleRemoveCompo(d.id)}
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

  const handleRemoveCompo = (id) => {
    setAction("remove-compo");
    setComponentItem({ compoId: id });
    dispatch(toggleModal());
  };

  const handleCompo = (id, name) => {
    setAction("add-compo");
    dispatch(toggleModal());
    setComponentItem({ id, name });
  };

  const handleSubmitRemove = () => {
    const removeComponent = async () => {
      try {
        const id = componentItem.compoId;
        const response = await adminApi.removeComponent(id);
        console.log(response);
        dispatch(toggleModal());
      } catch (error) {
        console.log("Failed to remove component: ", error);
      }
    };
    removeComponent();
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
        <DataTable pagination highlightOnHover />
      </DataTableExtensions>
      {modalIsOpen && action === "add-compo" && (
        <AddComponentContainer item={componentItem} />
      )}
      {modalIsOpen && action === "remove-compo" && (
        <ConfirmContainer
          title="Are you sure to remove this component?"
          onSubmit={handleSubmitRemove}
        />
      )}
      {modalIsOpen && <Backdrop />}
    </div>
  );
};

export default ManageComponentPage;
