import Overlay from "../../components/test/overlay";
import TestSignIn from "../../components/test/test-sign-in";
import TestSignUp from "../../components/test/test-sign-up";

import "./test.styles.scss";

const Test = () => (
  <div class="test-container">
    <div class="form-container sign-up-container">
      <TestSignUp className="right-panel-active" />
    </div>
    <div class="form-container sign-in-container">
      <TestSignIn />
    </div>
    <div class="overlay-container">
      <Overlay />
    </div>
  </div>
);

export default Test;
