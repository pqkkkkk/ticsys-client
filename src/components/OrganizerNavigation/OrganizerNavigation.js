import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./OrganizerNavigation.module.css";
import { useState } from "react";
function OrganizerNavigation() {
    const [currentNavItem, setCurrentNavItem] = useState("");
    return (
        <aside className={styles["sidebar"]}>
            <div className={styles["logo"]}>
                <img src="https://storage.googleapis.com/a1aa/image/4q7Ih66g8huHY7iM1MOaX7-Ve5oXidEJk69sMZcqXQY.jpg" alt="Logo" width="40" height="40"/>
                <span>Organizer Center</span>
            </div>
            <nav className={styles["nav"]}>
                <ul>
                    <li className={currentNavItem === "createEvent" ? `${styles["nav-item"]} ${styles["nav-item-active"]}`: styles["nav-item"]}
                        onClick={() => setCurrentNavItem("createEvent")}>
                        <i class="fas fa-plus"></i>
                        <NavLink to="/organizer/create_event" className={styles["link"]}>Create event</NavLink>
                    </li>
                    <li className={currentNavItem === "events" ? `${styles["nav-item"]} ${styles["nav-item-active"]}`: styles["nav-item"]}
                        onClick={() => setCurrentNavItem("events")}>
                        <i class="fas fa-calendar-alt"></i>
                        <NavLink to="/organizer/events" className={styles["link"]}>Events</NavLink>
                    </li>
                    <li className={currentNavItem === "profile" ? `${styles["nav-item"]} ${styles["nav-item-active"]}`: styles["nav-item"]}
                        onClick={() => setCurrentNavItem("profile")}>
                        <i class="fas fa-user"></i>
                        <NavLink to="/organizer/profile"  className={styles["link"]}>Profile</NavLink>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}
export default OrganizerNavigation;