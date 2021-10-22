import { Button, TextField } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toggleModal } from "../../redux/modal/modal.actions";
import ActiveEmailForm from "../active-email/active-email.component";
import CustomDialog from "../dialog/dialog.component";
import ProfileForm from "../profile-form/profile-form.component";
import "./profile.styles.scss";

const Profile = () => {
  const modalIsOpen = useSelector((state) => state.modal.isOpen);
  const dispatch = useDispatch();

  const handleActiveMail = () => {
    dispatch(toggleModal());
  };

  return (
    <div className="profile-block">
      <div>
        <div onClick={handleActiveMail}>Active Mail</div>
      </div>
      <div>
        <ProfileForm />
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
