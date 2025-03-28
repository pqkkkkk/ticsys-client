import React from "react";
import styles from "./MyProfile.module.css";
import { GetUser } from "../../../services/UserStorageService";
import { useEffect,useState } from "react";
function MyProfile() {
    const [user, setUser] = useState(GetUser());
    return (
        <div className={styles["profile-page"]}>
        <div className={styles["profile-container"]}>
            <h1>Profile Information</h1>
            <div className={styles["avatar"]}>
                <img src="https://storage.googleapis.com/a1aa/image/Qc6zFMQM0f2thNAkJlpDhRHPVKWtei7gfj04iyc26_U.jpg" alt="User avatar"/>
                <i class="fas fa-camera"></i>
            </div>
            <form>
                <div>
                    <label for="name">Họ và tên</label>
                    <div className={styles["name-input"]}>
                        <input type="text" id="name" value={user?.fullName}/>
                    </div>
                </div>
                <div>
                    <label for="phone">Số điện thoại</label>
                    <div className={styles["phone-input"]}>
                        <input type="text" id="phone" value={user?.phoneNumber}/>
                    </div>
                </div>
                <div>
                    <label for="email">Email</label>
                    <div className={styles["email-input"]}>
                        <input type="email" id="email" value={user?.email} readonly/>
                    </div>
                </div>
                <div>
                    <label for="dob">Ngày tháng năm sinh</label>
                    <div className={styles["date-input"]}>
                        <input type="text" id="dob" value={user?.birthday}/>
                    </div>
                </div>
                <div className={styles["gender-input"]}>
                    <label>
                        <input type="radio" name="gender" checked/> Nam
                    </label>
                    <label>
                        <input type="radio" name="gender"/> Nữ
                    </label>
                    <label>
                        <input type="radio" name="gender"/> Khác
                    </label>
                </div>
                <button type="submit">Hoàn thành</button>
            </form>
        </div>
        </div>
    );
}

export default MyProfile;