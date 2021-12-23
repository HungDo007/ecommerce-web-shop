import { useState, useEffect } from "react";

import MaterialTable from "material-table";

import adminApi from "../../../api/admin-api";
import Notification from "../../../components/notification/notification.component";

const ManageComponentPage = () => {
  const [componentList, setComponentList] = useState([]);

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const columns = [
    {
      title: "Id",
      field: "id",
      editable: "never",
    },
    {
      title: "Name",
      field: "name",
      validate: (rowData) =>
        rowData.name === undefined || rowData.name === ""
          ? "Name is required"
          : true,
    },
  ];

  const fetchComponentList = async () => {
    try {
      const response = await adminApi.getAllComponent();
      setComponentList(response);
    } catch (error) {}
  };

  useEffect(() => {
    fetchComponentList();
  }, []);

  return (
    <div className="manage-account-block">
      <MaterialTable
        options={{ actionsColumnIndex: -1, addRowPosition: "first" }}
        title="Component"
        columns={columns}
        data={componentList}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              const payload = {
                name: newData.name,
              };
              adminApi
                .addComponent(payload)
                .then((response) => {
                  fetchComponentList();
                  resolve();
                })
                .catch((error) => {
                  if (error.response?.data === "Component is exists.") {
                    setNotify({
                      isOpen: true,
                      message: "The component has already existed",
                      type: "error",
                    });
                  }
                  reject();
                });
            }),
          onRowUpdate: (newData) =>
            new Promise((resolve, reject) => {
              adminApi
                .editComponent({
                  id: newData.id,
                  name: newData.name,
                })
                .then((response) => {
                  fetchComponentList();
                  resolve();
                })
                .catch((error) => {
                  if (error.response?.data === "Component is exists.") {
                    setNotify({
                      isOpen: true,
                      message: "The component has already existed",
                      type: "error",
                    });
                  }
                  reject();
                });
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              adminApi
                .removeComponent(oldData.id)
                .then((response) => {
                  fetchComponentList();
                  resolve();
                })
                .catch((error) => {
                  reject();
                });
            }),
        }}
      />
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
};

export default ManageComponentPage;
