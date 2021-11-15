import MaterialTable from "material-table";

import LockIcon from "@material-ui/icons/Lock";

import adminApi from "../../../../api/admin-api";
import { toggleModal } from "../../../../redux/modal/modal.actions";

const UserTable = ({ actionLockUser, setUsername, dispatch }) => {
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
    actionLockUser("lock-user");
    setUsername(rowData.username);
    dispatch(toggleModal());
  };

  return (
    <div>
      <MaterialTable
        options={{ actionsColumnIndex: -1 }}
        title="User Accounts"
        data={(query) =>
          new Promise((resolve, reject) => {
            console.log(query);
            const params = {
              pageIndex: query.page + 1,
              pageSize: query.pageSize,
              keyword: query.search,
            };
            adminApi.getUserPaging(params).then((response) => {
              console.log(response);
              resolve({
                data: response.items,
                page: query.page,
                totalCount: response.totalRecords,
              });
            });
          })
        }
        columns={columns}
        actions={[
          {
            icon: LockIcon,
            tooltip: "Lock user account",
            onClick: (event, rowData) => {
              handleLockAccount(event, rowData);
            },
          },
        ]}
      />
    </div>
  );
};

export default UserTable;
