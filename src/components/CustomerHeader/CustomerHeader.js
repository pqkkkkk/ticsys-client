import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./CustomerHeader.module.css";
import { useNavigate } from "react-router-dom";
import { GetUser } from "../../services/UserStorageService";
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
function CustomerHeader() {
  const navigate = useNavigate();
  const user = GetUser();

  const HandleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  }
  return (
    <header>
      <div className={styles["logo"]} onClick={() => navigate("/")}>Ticketbox</div>
      <div className={styles["search-bar"]}>
        <input type="text" placeholder="Type name of event..." />
        <button>Search</button>
      </div>
      {user && (user.roles.find(role => role === "ORGANIZER") === undefined) && (
        <div className={styles["become-organizer"]}>
          <button onClick={() => navigate("/become-organizer")}>Become organizer</button>
        </div>
      )}
       {user && (user.roles.find(role => role === "ORGANIZER") !== undefined) && (
        <div className={styles["become-organizer"]}>
          <button onClick={() => navigate("/organizer")}>Organizer dashboard</button>
        </div>
      )}
      <nav>
        <ul>
          {!user && (
              <li>
                <NavLink to="/signin" activeClassName={styles["active"]} className={styles["link"]}>Sign In</NavLink>
              </li>
          )}
          {!user && (
              <li>
                <NavLink to="/signup" activeClassName={styles["active"]} className={styles["link"]}>Sign Up</NavLink>
              </li>
          )}
          {user &&(
            <li>
              <NavLink to="/orders" activeClassName={styles["active"]}  className={styles["link"]}>Tickets</NavLink>
            </li>
          )}
          {user &&(
            <li>
              <NavLink to="/profile" activeClassName={styles["active"]} className={styles["link"]}>Profile</NavLink>
            </li>
          )}
        </ul>
      </nav>
      <div>
        {user &&(
          <div className={styles["icons"]}>
              <div className={styles["icon"]}>
                <NotificationsIcon/>
              </div>
              <div className={styles["icon"]} onClick={HandleLogout}>
                <LogoutIcon/>
              </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default CustomerHeader;