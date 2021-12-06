// import { useState } from "react";
// import { Tab, Tabs } from "@material-ui/core";
import MaterialTable from "material-table";

import CancelIcon from "@material-ui/icons/Cancel";
import InfoIcon from "@material-ui/icons/Info";

import CustomDialog from "../../components/dialog/dialog.component";

import salesApi from "../../api/sales.api";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Confirm from "../confirm/confirm.component";
import { toggleModal } from "../../redux/modal/modal.actions";
import { useState } from "react";
import { useRef } from "react";

const Order = (props) => {
  //   const [value, setValue] = useState(0);

  //   const handleChange = (event, value) => {
  //     setValue(value);
  //   };

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

  const [orderId, setOrderId] = useState(0);

  const modalIsOpen = useSelector((state) => state.modal.isOpen);

  const tableRef = useRef(null);

  const dispatch = useDispatch();

  const handleOpenModal = (event, rowData) => {
    setOrderId(rowData.id);
    dispatch(toggleModal());
  };

  const handleDetail = (event, rowData) => {
    props.history.push(`order/${rowData.id}`);
  };

  const handleCancel = () => {
    const cancelOrder = async () => {
      try {
        const response = await salesApi.cancelOrder(orderId);
        if (response.status === 200 && response.statusText === "OK") {
          tableRef.current.onQueryChange();
        }
      } catch (error) {
        console.log("Failed to cancel order: ", error?.response);
      }
    };
    cancelOrder();
    dispatch(toggleModal());
  };

  return (
    <div className="manage-account-block">
      {/* <div className="manage-account-header">
        <div>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="All" />
            <Tab label="To Pay" />
            <Tab label="Cancelled" />
          </Tabs>
        </div>
      </div>
      <div>
        <TabPanel value={value} index={0}>
          <div>all</div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div>to pay</div>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <div>cancelled</div>
        </TabPanel>
      </div> */}
      <MaterialTable
        title="Order"
        tableRef={tableRef}
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
          {
            icon: CancelIcon,
            tooltip: "Cancel Order",
            onClick: (event, rowData) => {
              handleOpenModal(event, rowData);
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
              .getOrder(params)
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
      <CustomDialog
        title="Cancel the order"
        open={modalIsOpen}
        dispatch={dispatch}
      >
        <Confirm
          title="Are you sure to cancel this order?"
          onSubmit={handleCancel}
        />
      </CustomDialog>
    </div>
  );
};

// const TabPanel = (props) => {
//   const { children, value, index } = props;
//   return <div>{value === index && children}</div>;
// };

export default Order;
