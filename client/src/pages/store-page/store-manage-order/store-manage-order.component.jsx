import { useState } from "react";

import { Tabs, Tab } from "@material-ui/core";
import UnconfirmedOrderTable from "./data-table/uncomfirmed-order-table";
import AllOrderTable from "./data-table/all-order-table";

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
        </Tabs>
      </div>
      <TabPanel value={value} index={0}>
        <AllOrderTable />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <UnconfirmedOrderTable />
      </TabPanel>
    </div>
  );
};

const TabPanel = (props) => {
  const { children, value, index } = props;
  return <div>{value === index && children}</div>;
};

export default StoreManagesOrder;
