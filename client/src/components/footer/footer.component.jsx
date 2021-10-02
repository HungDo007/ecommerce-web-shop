import "./footer.styles.css";
import { IconContext } from "react-icons";
import * as ImIcons from "react-icons/im";
import * as FiIcons from "react-icons/fi";
import * as FaIcons from "react-icons/fa";

const Footer = () => {
  return (
    <IconContext.Provider value={{ color: "#fff" }} s>
      <footer>
        <div class="footer-container">
          <div class="content about">
            <h2>OUR INFO</h2>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Praesentium dolores alias ipsa vel hic tempore exercitationem
              ipsam explicabo repudiandae ut consectetur qui, earum at nostrum
              perspiciatis asperiores necessitatibus facilis esse. Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Quia id possimus
              quibusdam nihil earum in provident enim animi commodi quisquam!
              Molestiae cupiditate mollitia pariatur error ea, debitis eaque quo
              dolorum.
            </p>
            <ul class="social-icon">
              <li>
                <a href="#">
                  <ImIcons.ImFacebook />
                </a>
              </li>
              <li>
                <a href="#">
                  <ImIcons.ImTwitter />
                </a>
              </li>
              <li>
                <a href="#">
                  <FiIcons.FiInstagram />
                </a>
              </li>
              <li>
                <a href="#">
                  <ImIcons.ImYoutube2 />
                </a>
              </li>
            </ul>
          </div>
          <div class="content links">
            <h2>LINK</h2>
            <ul>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Service</a>
              </li>
            </ul>
          </div>
          <div class="content contact">
            <h2>CONTACT</h2>
            <ul class="info">
              <li>
                <span>
                  <FaIcons.FaMapMarkerAlt />
                </span>
                <span>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </span>
              </li>
              <li>
                <span>
                  <ImIcons.ImPhone />
                </span>
                <p>
                  <a href="#">+84 123 456 789</a>
                  <br />
                  <a href="#">+84 987 654 321</a>
                </p>
              </li>
              <li>
                <span>
                  <FaIcons.FaEnvelope />
                </span>
                <p>
                  <a href="#">email@gmail.com</a>
                </p>
              </li>
              <li>
                <form class="form">
                  <input
                    type="email"
                    class="form__field"
                    placeholder="Subscribe Email"
                  />
                  <button type="button" class="btn btn--primary  uppercase">
                    Send
                  </button>
                </form>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </IconContext.Provider>
  );
};

export default Footer;
