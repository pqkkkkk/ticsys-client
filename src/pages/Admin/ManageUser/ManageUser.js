import React from "react";
import styles from "./ManageUser.module.css";
import { useEffect, useState } from "react";
import { GetUsersApi } from "../../../services/api/AccountApi";
function ManageUser() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await GetUsersApi();
            setUsers(response);
        };
        fetchUsers();
    }, []);
    return (
        <div className={styles["manage-user-container"]}>
            <div className={styles["main-header"]}>
                <h1>Manage Users</h1>
                <button>
                    <i class="fas fa-user-plus"></i> Add User
                </button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone number</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th className={styles["actions"]}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map((user, index) => (
                        <tr>
                            <td>{user.fullName}</td>
                            <td>{user.phoneNumber}</td>
                            <td>{user.email}</td>
                            <td>
                                {user.roles?.map((role) => (
                                    <p>{role}</p>
                                ))}
                            </td>
                            <td className={styles["actions"]}>
                                <button>
                                    <i class="fas fa-edit"></i> Edit
                                </button>
                                <button className={styles["delete"]}>
                                    <i class="fas fa-trash"></i> Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageUser;