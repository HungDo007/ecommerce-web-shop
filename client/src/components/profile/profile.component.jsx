import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";

import userApi from "../../api/user-api";
import ProfileForm from "../profile-form/profile-form.component";
import ActiveEmailForm from "../active-email/active-email.component";
import ChangePassword from "../change-password/change-password.component";

const defaultImg = "/img/default-img.png";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    margin: "2rem auto",
    width: "77%",
    boxShadow:
      "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    minWidth: 220,
  },
  tabPanel: {
    width: "100%",
  },
}));

const Profile = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const initialValues = {
    id: 0,
    emailConfirmed: false,
    avatar: defaultImg,
    avatarFile: null,
    firstName: "",
    lastName: "",
    dob: new Date(2000, 1, 1),
    email: "",
    phoneNumber: "",
    address: "",
    role: "",
  };
  const [values, setValues] = useState(initialValues);

  const currentUser = useSelector((state) => state.user.currentUser);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const response = await userApi.getProfile(currentUser.unique_name);
        setValues({
          id: response.id,
          avatar: response.avatar
            ? process.env.REACT_APP_IMAGE_URL + response.avatar
            : values.avatar,
          firstName: response.firstName ? response.firstName : "",
          lastName: response.lastName ? response.lastName : "",
          dob: response.dob ? response.dob : values.dob,
          email: response.email ? response.email : "",
          phoneNumber: response.phoneNumber ? response.phoneNumber : "",
          address: response.address ? response.address : "",
          emailConfirmed: response.emailConfirmed,
          role: response.role,
        });
      } catch (error) {
        console.log("Failed to get user profile: ", error);
      }
    };

    getUserProfile();
  }, []);

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
        TabIndicatorProps={{ style: { backgroundColor: "#3f51b5", left: 0 } }}
      >
        <Tab label="User Information" {...a11yProps(0)} />
        <Tab label="Change Password" {...a11yProps(1)} />
        {values.emailConfirmed || values.role === "Admin" ? null : (
          <Tab label="Active Email" {...a11yProps(2)} />
        )}
      </Tabs>
      <TabPanel value={value} index={0} className={classes.tabPanel}>
        <ProfileForm values={values} setValues={setValues} />
      </TabPanel>
      <TabPanel value={value} index={1} className={classes.tabPanel}>
        <ChangePassword />
      </TabPanel>
      <TabPanel value={value} index={2} className={classes.tabPanel}>
        <ActiveEmailForm />
      </TabPanel>
    </div>
  );
};

export default Profile;
