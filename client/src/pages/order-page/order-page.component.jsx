import { Tab, Tabs } from "@material-ui/core";
import { useState } from "react";

const OrderPage = () => {
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
      </div>
    </div>
  );
};

const TabPanel = (props) => {
  const { children, value, index } = props;
  return <div>{value === index && children}</div>;
};

export default OrderPage;
