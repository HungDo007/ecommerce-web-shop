import MaterialTable from "material-table";

import adminApi from "../../../../api/admin-api";

const AdminTable = ({ tableRef }) => {
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

  return (
    <MaterialTable
      title="Admin Account"
      tableRef={tableRef}
      columns={columns}
      data={(query) =>
        new Promise((resolve, reject) => {
          const params = {
            pageIndex: query.page + 1,
            pageSize: query.pageSize,
            keyword: query.search,
          };
          adminApi.getAdminPaging(params).then((response) => {
            resolve({
              data: response.items,
              page: query.page,
              totalCount: response.totalRecords,
            });
          });
        })
      }
    />
  );
};

export default AdminTable;
