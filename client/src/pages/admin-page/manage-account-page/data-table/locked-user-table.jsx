import MaterialTable from "material-table";
import LockOpenIcon from "@material-ui/icons/LockOpen";

import { toggleModal } from "../../../../redux/modal/modal.actions";

import adminApi from "../../../../api/admin-api";

const LockedUserTable = ({
  tableRef,
  actionLockUser,
  setUsername,
  dispatch,
}) => {
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

  const handleUnlockAccount = (event, rowData) => {
    actionLockUser("unlock-user");
    setUsername(rowData.username);
    dispatch(toggleModal());
  };

  return (
    <div>
      <MaterialTable
        title="User Accounts"
        tableRef={tableRef}
        options={{ actionsColumnIndex: -1 }}
        data={(query) =>
          new Promise((resolve, reject) => {
            const params = {
              pageIndex: query.page + 1,
              pageSize: query.pageSize,
              keyword: query.search,
            };
            adminApi
              .getLockedUserPaging(params)
              .then((response) => {
                resolve({
                  data: response.items,
                  page: query.page,
                  totalCount: response.totalRecords,
                });
              })
              .catch((error) => {
                reject();
              });
          })
        }
        columns={columns}
        actions={[
          {
            icon: LockOpenIcon,
            tooltip: "Unlock user account",
            onClick: (event, rowData) => {
              handleUnlockAccount(event, rowData);
            },
          },
        ]}
      />
    </div>
  );
};

export default LockedUserTable;
