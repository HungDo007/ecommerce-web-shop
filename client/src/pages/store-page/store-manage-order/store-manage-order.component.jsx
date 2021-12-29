import { useState } from "react";

import { Tabs, Tab } from "@material-ui/core";
import AllOrderTable from "./data-table/all-order-table";
import UnconfirmedOrderTable from "./data-table/unconfirmed-order-table";
import ConfirmedOrderTable from "./data-table/confirmed-order-table";
import CancelledOrderTable from "./data-table/cancelled-table";

const StoreManagesOrder = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, value) => {
    setValue(value);
  };

  return (
    <div className="manage-account-block">
      <div className="manage-account-header">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="All" />
          <Tab label="Unconfirmed" />
          <Tab label="Confirmed" />
          <Tab label="Cancelled" />
        </Tabs>
      </div>
      <TabPanel value={value} index={0}>
        <AllOrderTable />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <UnconfirmedOrderTable />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ConfirmedOrderTable />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <CancelledOrderTable />
      </TabPanel>
    </div>
  );
};

const TabPanel = (props) => {
  const { children, value, index } = props;
  return <div>{value === index && children}</div>;
};

export default StoreManagesOrder;
