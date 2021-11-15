import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { toggleModal } from "../../redux/modal/modal.actions";
import ActiveEmailForm from "../active-email/active-email.component";
import CustomDialog from "../dialog/dialog.component";
import ProfileForm from "../profile-form/profile-form.component";

import userApi from "../../api/user-api";

import "./profile.styles.scss";

const defaultImg = "/img/default-img.png";

const Profile = () => {
  const initialValues = {
    id: 0,
    emailConfirmed: false,
    avatar: defaultImg,
    avatarFile: null,
    firstName: "",
    lastName: "",
    dob: new Date(1995, 11, 17),
    email: "",
    phoneNumber: "",
    address: "",
    role: "",
  };
  const [values, setValues] = useState(initialValues);

  const modalIsOpen = useSelector((state) => state.modal.isOpen);
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const handleActiveMail = () => {
    dispatch(toggleModal());
  };

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const response = await userApi.getProfile(currentUser.unique_name);
        setValues({
          id: response.id,
          avatar: response.avatar
            ? process.env.REACT_APP_IMAGE_URL + response.avatar
            : null,
          firstName: response.firstName,
          lastName: response.lastName,
          dob: response.dob,
          email: response.email,
          phoneNumber: response.phoneNumber,
          address: response.address,
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
    <div className="profile-block">
      <div className="profile-task">
        {values.emailConfirmed || values.role === "Admin" ? null : (
          <div onClick={handleActiveMail}>Active Mail</div>
        )}
      </div>
      <div>
        <ProfileForm values={values} setValues={setValues} />
      </div>
      <CustomDialog
        title="Active your email"
        open={modalIsOpen}
        dispatch={dispatch}
      >
        <ActiveEmailForm />
      </CustomDialog>
    </div>
  );
};

export default Profile;
