import React from "react";
import styles from "./Error.module.css";
import { useNavigate } from "react-router-dom";
function Error() {

    const navigate = useNavigate();
    const HandleBack = () => {
        navigate(-1);
    }
    const HandleHome = () => {
        navigate("/");
    }
    return (
        <div className={styles["container"]}>
            <h1 className={styles["title"]}>Oops! Page Not Found</h1>
            <div className={styles["image-container"]}>
                <div className={styles["status-code"]}>404</div>
            </div>
            <p className={styles["message"]}>
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                Please try to go back or return to the Home page
            </p>
            <div className={styles["buttons"]}>
                <button onClick={HandleBack} className={styles["button"]}>Back to previous page</button>
                <button onClick={HandleHome} className={`${styles["button"]} ${styles["button-primary"]}`}>Home page</button>
            </div>
        </div>
  );
}

export default Error;