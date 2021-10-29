import { useEffect } from "react";
import { useState } from "react";
import * as BiIcon from "react-icons/bi";
import { IconContext } from "react-icons";

const Notification = (props) => {
  const [hide, setHide] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setHide(false);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div>
      {hide ? (
        <div>
          <IconContext.Provider value={{ color: "green", size: "50px" }}>
            <div className="modal">
              <div className="modal-center">
                <BiIcon.BiCheckCircle />
              </div>
              <div className="modal-message">{props.message}</div>
            </div>
          </IconContext.Provider>
          <div className="backdrop"></div>
        </div>
      ) : null}
    </div>
  );
};

export default Notification;
