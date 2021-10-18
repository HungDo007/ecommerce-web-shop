import { Tab, Tabs } from "@material-ui/core";
import { useState } from "react";
import CustomButton from "../../../components/custom-button/custom-button.component";

import "./test.scss";

const TestAccount = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, value) => {
    setValue(value);
  };

  return (
    <div className="manage-account-block">
      <div>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="All Admins" />
          <Tab label="All Users" />
          <Tab label="Locked Users" />
        </Tabs>
        <TabPanel value={value} index={0}>
          Item 1
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item 2
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item 3
        </TabPanel>
      </div>
      <div>
        <CustomButton>Add new admin</CustomButton>
      </div>
    </div>
  );
};

const TabPanel = (props) => {
  const { children, value, index } = props;
  return <div>{value === index && children}</div>;
};

export default TestAccount;
