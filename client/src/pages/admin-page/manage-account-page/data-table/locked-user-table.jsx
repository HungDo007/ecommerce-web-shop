import { useEffect } from "react";
import { useState } from "react";

import MaterialTable from "material-table";

import LockOpenIcon from "@material-ui/icons/LockOpen";

import adminApi from "../../../../api/admin-api";

const LockedUserTable = () => {
  const [lockedUserList, setLockedUserList] = useState([]);

  const columns = [
    {
      title: "Username",
      field: "username",
    },
    {
      title: "Name",
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

  const handleLockAccount = (event, rowData) => {
    console.log(rowData);
  };

  useEffect(() => {
    const fetchLockedUserList = async () => {
      try {
        const response = await adminApi.getAllLockedUser();
        setLockedUserList(response);
      } catch (error) {
        console.log("Failed to fetch list: ", error);
      }
    };
    fetchLockedUserList();
  }, []);
  return (
    <MaterialTable
      options={{ actionsColumnIndex: -1 }}
      title="User Accounts"
      data={lockedUserList}
      columns={columns}
      actions={[
        {
          icon: LockOpenIcon,
          tooltip: "Unlock user account",
          onClick: (event, rowData) => {
            handleLockAccount(event, rowData);
          },
        },
      ]}
    />
  );
};

export default LockedUserTable;
