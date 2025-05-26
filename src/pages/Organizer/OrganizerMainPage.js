import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import OrganizerNavigation from "../../components/OrganizerNavigation/OrganizerNavigation";
import styles from "./OrganizerMainPage.module.css"
import CreateEvent from "./CreateEvent/CreateEvent";
import MyEventList from "./MyEventList/MyEventList";
import { GetUser } from "../../services/UserStorageService";
import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
function OrganizerMainPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(GetUser());

  useEffect(() => {
    if(user === null || user.roles.find(role => role === "ORGANIZER") === undefined){
      navigate('/error');
    }
  }, [navigate,user]);
  
  return (
      <div className={styles["container"]}>
        <OrganizerNavigation />
        
        <div className={styles["content"]}>
          <Routes>
            <Route path="create_event" Component={CreateEvent} />
            <Route path="events" Component={MyEventList} />
            <Route path="profile" Component={MyEventList} />
          </Routes>
        </div>
      </div>
  );
}

export default OrganizerMainPage;