import { useHistory } from "react-router";

import MaterialTable from "material-table";
import InfoIcon from "@material-ui/icons/Info";

import { formatMoney } from "../../../utils/format-money";
import { cut } from "../../../utils/cut-string";
import salesApi from "../../../api/sales.api";

const UserCancelledOrderTable = () => {
  const columns = [
    {
      title: "Name",
      field: "name",
      render: (rowData) => <div>{cut(rowData.name, 36)}</div>,
    },
    {
      title: "Quantity",
      field: "quantity",
    },
    {
      title: "Shop",
      field: "shopName",
      render: (rowData) =>
        rowData.shopName ? rowData.shopName : rowData.seller,
    },
    {
      title: "Total",
      field: "sumPrice",
      render: (rowData) => <div>${formatMoney(rowData.sumPrice)}</div>,
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

  const history = useHistory();

  const handleDetail = (event, rowData) => {
    history.push(`/order/${rowData.id}`);
  };

  return (
    <MaterialTable
      title="All Order"
      columns={columns}
      options={{ actionsColumnIndex: -1 }}
      actions={[
        {
          icon: InfoIcon,
          tooltip: "View Detail",
          onClick: (event, rowData) => {
            handleDetail(event, rowData);
          },
        },
      ]}
      detailPanel={(rowData) => {
        return (
          <div
            style={{ padding: "12px", fontSize: "16px", background: "#f5f5f5" }}
          >
            Delivery Address: Name: {rowData.shipName}, Phone Number:{" "}
            {rowData.shipPhonenumber}, Address: {rowData.shipAddress}
          </div>
        );
      }}
      data={(query) =>
        new Promise((resolve, reject) => {
          const params = {
            pageIndex: query.page + 1,
            pageSize: query.pageSize,
            keyword: query.search,
          };
          salesApi
            .getUserOrder(params, 4)
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
    />
  );
};

export default UserCancelledOrderTable;
