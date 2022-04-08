import styles from "./navbar.module.css";
import logo2 from "../../../assets/logo/logo-2.png";

//Layout: for navbar
function Navbar() {
  return (
    <div className={styles.navbar}>
      <img src={logo2} alt="coffeepretzellogo" />
    </div>
  );
}

export default Navbar;
