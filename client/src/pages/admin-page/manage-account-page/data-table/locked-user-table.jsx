import { useDispatch } from "react-redux";

import MaterialTable from "material-table";
import LockOpenIcon from "@material-ui/icons/LockOpen";

import { toggleModal } from "../../../../redux/modal/modal.actions";

import adminApi from "../../../../api/admin-api";

const LockedUserTable = ({ actionLockUser, setUsername }) => {
  const dispatch = useDispatch();

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
    actionLockUser("unlock-user");
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
            adminApi.getLockedUserPaging(params).then((response) => {
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
            icon: LockOpenIcon,
            tooltip: "Unlock user account",
            onClick: (event, rowData) => {
              handleLockAccount(event, rowData);
            },
          },
        ]}
      />
    </div>
  );
};

export default LockedUserTable;
