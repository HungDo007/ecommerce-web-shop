import { useState } from "react";
import SignIn from "../../components/sign-in/sign-in.component";
import SignUp from "../../components/sign-up/sign-up.component";

import "./sign-in-and-sign-up.styles.scss";

const background = "./img/background.jpg";

const SignInAndSignUpPage = () => {
  const [action, setAction] = useState(true);
  return (
    <div className="sign-block">
      <div
        style={{ backgroundImage: `url(${background})` }}
        className="background-image"
      >
        <div>
          {action ? (
            <SignIn setAction={setAction} />
          ) : (
            <SignUp setAction={setAction} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SignInAndSignUpPage;
