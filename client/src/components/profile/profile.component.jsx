import ProfileForm from "../profile-form/profile-form.component";
import "./profile.styles.scss";

const Profile = () => {
  return (
    <div className="profile-block">
      <div>Some information</div>
      <div>
        <ProfileForm />
      </div>
    </div>
  );
};

export default Profile;
