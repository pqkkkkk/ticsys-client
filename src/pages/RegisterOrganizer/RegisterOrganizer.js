import React from "react";
import styles from "./RegisterOrganizer.module.css";
import { useEffect,useState } from "react";
import { GetUser } from "../../services/UserStorageService";
import { useNavigate } from "react-router-dom";
import { RegisterOrganizerApi } from "../../services/api/AccountApi";
import { set } from "date-fns";

function RegisterOrganizer() {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(GetUser());
    const [organizerInfo, setOrganizerInfo] = useState({
        name: "",
        description: "",
        userId: "",
    });
    const [logo, setLogo] = useState(null);
    const [SubmitClicked, setSubmitClicked] = useState(false);

    useEffect(() => {
        if(!currentUser){
            navigate("/signin");
        }
        setOrganizerInfo({...organizerInfo, userId: currentUser?.userName});
    }, [currentUser, navigate]);
    useEffect(() => {
        const SubmitRegisterOrganizer = async () => {
            if(SubmitClicked){
                if(organizerInfo.name === ""){
                    alert("Organizer name is required");
                    setSubmitClicked(false);
                }
                else{
                    const registerOrganizerRequest = new FormData();
                    registerOrganizerRequest.append("organizerInfo", JSON.stringify(organizerInfo));
                    registerOrganizerRequest.append("logo", logo);

                    const response = await RegisterOrganizerApi(registerOrganizerRequest);

                    if(response){
                        alert("Register organizer successfully");
                        navigate("/signin");
                    }
                    else{
                        alert("Register organizer failed");
                    }
                }
            }
        }
        SubmitRegisterOrganizer();
    }, [SubmitClicked,organizerInfo,logo,navigate]);
    const HandleSubmit = async (e) => {
        e.preventDefault();

        setSubmitClicked(true);
    }
    return (
        <div className={styles["register-organizer-page"]}>
            <div className={styles["register-organizer"]}>
                <div className={styles["register-organizer-title"]}>
                    <h1>Become Organizer</h1>
                </div>
                <form className={styles["register-organizer-form"]}>
                    <div className={styles["register-organizer-input-item"]}>
                        <label className={styles["register-organizer-label"]} htmlFor="organizername">Organizer name</label>
                        <input
                            value={organizerInfo.name}
                            onChange={(e) => setOrganizerInfo({ ...organizerInfo, name: e.target.value })}
                            className={styles["register-organizer-input"]} id="organizername" type="text" placeholder="Organizer name" />
                    </div>
                    <div className={styles["register-organizer-input-item"]}>
                        <label className={styles["register-organizer-label"]} htmlFor="organizerdescription">Brief Description</label>
                        <input
                            value={organizerInfo.description}
                            onChange={(e) => setOrganizerInfo({ ...organizerInfo, description: e.target.value })}
                            className={styles["register-organizer-input"]} id="organizerdescription" type="text" placeholder="Brief description" />
                    </div>
                    <div className={styles["register-organizer-input-item"]}>
                        <label className={styles["register-organizer-label"]} htmlFor="organizeravt">Organizer Logo</label>
                        <input
                            type="file"
                            value={logo}
                            onChange={(e) => setLogo(e.target.files[0])}
                            className={styles["register-organizer-input"]} id="organizeravt" />
                    </div>
                    <div className={styles["register-organizer-terms"]}>
                        <h2>Terms and Conditions for Event Organizers:</h2>
                        <ul>
                            <li>The organizer must provide accurate and complete information about the event.</li>
                            <li>The organizer is responsible for ensuring the event complies with all applicable laws and regulations.</li>
                            <li>The organizer must not engage in any fraudulent or deceptive practices.</li>
                            <li>The organizer must handle all customer inquiries and complaints promptly and professionally.</li>
                            <li>The organizer must ensure the safety and security of attendees at the event.</li>
                            <li>The organizer must not sell tickets above the maximum capacity of the venue.</li>
                            <li>The organizer must provide refunds in accordance with the stated refund policy.</li>
                            <li>The organizer must not use the ticketing system for any illegal or unauthorized purpose.</li>
                            <li>The organizer must comply with the platform's privacy policy and terms of service.</li>
                            <li>The organizer must ensure that all promotional materials are truthful and not misleading.</li>
                        </ul>
                    </div>
                    <div className={styles["register-organizer-input-item"]}>
                        <button onClick={HandleSubmit} className={styles["register-organizer-button"]}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterOrganizer;