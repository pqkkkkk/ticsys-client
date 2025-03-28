import React from "react";
import styles from "./AdminMainPage.module.css";
import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import ManageUser from "./ManageUser/ManageUser";
import ManageOrder from "./ManageOrder/ManageOrder";
import Report from "./Report/Report";

function AdminMainPage() {
    const [activeItem, setActiveItem] = useState("Users");

    const handleItemClick = (item) => {
        setActiveItem(item);
    };

    return (
        <div className={styles["admin-container"]}>
            <div className={styles["sidebar"]}>
                <div className={styles["logo"]}>
                    <img src="https://storage.googleapis.com/a1aa/image/amaNA0uoERfg-3hwsjF3ljt2wJ_5uj8H471bBXMVPmg.jpg" alt="Logo" width="40" height="40"/>
                    <span>Admin Center</span>
                </div>
                <nav>
                    <ul>
                        <li className={activeItem === "Report" ? styles["active"] : ""} 
                            onClick={() => handleItemClick("Report")}>
                            <Link to={"/admin/report"}>
                            <i className="fas fa-arrow-left"></i> Report</Link>
                        </li>
                        <li className={activeItem === "Users" ? styles["active"] : ""} 
                            onClick={() => handleItemClick("Users")}>
                                <Link to={"/admin/users"}>
                                <i className="fas fa-chart-pie"></i> Users</Link>
                        </li>
                        <li className={activeItem === "Orders" ? styles["active"] : ""} 
                            onClick={() => handleItemClick("Orders")}>
                                <Link to={"/admin/orders"}><i className="fas fa-bullhorn"></i> Orders</Link>
                        </li>
                        <li className={activeItem === "Organizer register request" ? styles["active"] : ""} 
                            onClick={() => handleItemClick("Organizer register request")}><a href="#"><i className="fas fa-list-alt"></i> Organizer register request</a></li>
                    </ul>
                </nav>
            </div>
            <div className={styles["main-content"]}>
                <Routes>
                    <Route path="users" Component={ManageUser}/>
                    <Route path="orders" Component={ManageOrder}/>
                    <Route path="report" Component={Report}/>
                </Routes>
            </div>
        </div>
    );
};

export default AdminMainPage;