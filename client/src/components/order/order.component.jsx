import { useState } from "react";
import { Tab, Tabs } from "@material-ui/core";

import UserAllOrderTable from "./data-table/user-all-order-table";
import UserUnconfirmedOrderTable from "./data-table/user-unconfirmed-order-table";
import UserConfirmedOrderTable from "./data-table/user-confirmed-order-table";
import UserCancelledOrderTable from "./data-table/user-cancelled-order-table";

const Order = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, value) => {
    setValue(value);
  };

  return (
    <div className="manage-account-block">
      <div className="manage-account-header">
        <div>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="All" />
            <Tab label="Unconfirmed" />
            <Tab label="Confirmed" />
            <Tab label="Cancelled" />
          </Tabs>
        </div>
      </div>
      <div>
        <TabPanel value={value} index={0}>
          <UserAllOrderTable />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <UserUnconfirmedOrderTable />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <UserConfirmedOrderTable />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <UserCancelledOrderTable />
        </TabPanel>
      </div>
    </div>
  );
};

const TabPanel = (props) => {
  const { children, value, index } = props;
  return <div>{value === index && children}</div>;
};

export default Order;
