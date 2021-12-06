import MaterialTable from "material-table";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import salesApi from "../../../../api/sales.api";

const UnconfirmedOrderTable = () => {
  const handleConfirm = (event, rowData) => {
    console.log(rowData);
  };

  const columns = [
    {
      title: "Name",
      field: "name",
    },
    {
      title: "Quantity",
      field: "quantity",
    },
    {
      title: "Total",
      field: "sumPrice",
      render: (rowData) => <div>${rowData.sumPrice}</div>,
    },
    {
      title: "Payment",
      field: "paid",
      lookup: { true: "Paid", false: "Not Paid" },
    },
    {
      title: "Status",
      field: "orderStatus",
      lookup: {
        0: "Unconfirmed",
        1: "Confirmed",
        2: "Shipping",
        3: "Complete",
        4: "Cancelled",
      },
    },
  ];

  return (
    <MaterialTable
      title="Unconfirmed Order"
      columns={columns}
      options={{ actionsColumnIndex: -1 }}
      actions={[
        {
          icon: () => (
            <AssignmentTurnedInIcon
              style={{ fontSize: 25, color: "rgb(76, 175, 80)" }}
            />
          ),
          tooltip: "Confirm order",
          onClick: (event, rowData) => {
            handleConfirm(event, rowData);
          },
        },
      ]}
      data={(query) =>
        new Promise((resolve, reject) => {
          const params = {
            pageIndex: query.page + 1,
            pageSize: query.pageSize,
            keyword: query.search,
          };
          salesApi
            .getUnconfirmedOrder(params)
            .then((response) => {
              resolve({
                data: response.items,
                page: query.page,
                totalCount: response.totalRecords,
              });
              // console.log(response);
            })
            .catch((error) => {
              console.log(error?.response);
              reject();
            });
        })
      }
    />
  );
};

export default UnconfirmedOrderTable;
