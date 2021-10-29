import { useEffect } from "react";
import { useState } from "react";

import MaterialTable from "material-table";

import adminApi from "../../../../api/admin-api";

const AdminTable = () => {
  const [adminList, setAdminList] = useState([]);

  const columns = [
    {
      title: "Username",
      field: "username",
    },
    {
      title: "Name",
      field: "name",
      render: (rowData) =>
        rowData.firstName === null && rowData.lastName === null ? (
          <em>null</em>
        ) : (
          `${rowData.firstName} ${rowData.lastName}`
        ),
    },
    {
      title: "Email",
      field: "email",
    },
    {
      title: "Address",
      field: "address",
      emptyValue: () => <em>null</em>,
    },
  ];

  useEffect(() => {
    const fetchAdminList = async () => {
      try {
        const response = await adminApi.getAllAdmin();
        setAdminList(response);
      } catch (error) {
        console.log("Failed to fetch list: ", error);
      }
    };
    fetchAdminList();
  }, []);

  return (
    <MaterialTable title="Admin Accounts" data={adminList} columns={columns} />
  );
};

export default AdminTable;
