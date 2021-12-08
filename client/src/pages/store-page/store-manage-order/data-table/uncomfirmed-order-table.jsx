import { useRef } from "react";

import MaterialTable from "material-table";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import salesApi from "../../../../api/sales.api";

const UnconfirmedOrderTable = () => {
  const tableRef = useRef(null);

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

  const handleConfirm = (event, rowData) => {
    let payload = rowData.map((item) => item.id);
    const confirmOrder = async () => {
      try {
        const response = await salesApi.confirmOrder(payload);
        if (response.status === 200 && response.statusText === "OK") {
          tableRef.current.onQueryChange();
        }
      } catch (error) {
        console.log(error?.response);
      }
    };
    confirmOrder();
    //console.log(payload);
  };

  return (
    <MaterialTable
      title="Unconfirmed Order"
      tableRef={tableRef}
      columns={columns}
      options={{ actionsColumnIndex: -1 }}
      options={{
        selection: true,
      }}
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
