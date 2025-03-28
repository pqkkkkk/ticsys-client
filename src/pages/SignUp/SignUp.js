import { InputLabel, TextField } from "@mui/material";
import React from "react";
import { useState,useEffect } from "react";
import styles from "./SignUp.module.css"
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { SignUpApi } from "../../services/api/AccountApi";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
function SignUp() {
    const navigate = useNavigate();
    const [fullname, setFullname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");
    const [birthday, setBirthday] = useState("");
    
    const HandleSignUp = async () => {
        const signUpRequest = {
            fullName : fullname,
            userName: username,
            email: email,
            passWord: password,
            phoneNumber: phone,
            birthday: format(birthday, "yyyy-MM-dd"),
            gender: gender,
            roles: ["USER"],
            avatarPath: ""
        }
        const response = await SignUpApi(signUpRequest);

        if(response){
            console.log(response);
            if(response === "successfully")
            {
                alert("Sign up successful");
                navigate("/signin");
            }
            else
            {
                alert("Sign up failed");
            }
        }
    }
    const darkTheme = createTheme({
        palette: {
          mode: "dark",
        },  
    });
    return (
        <ThemeProvider theme={darkTheme}>
            <div className={styles["sign-up-page"]}>
                <div className={styles["sign-up"]}>
                    <div className={styles["title"]}>
                        <h1>Sign Up</h1>
                    </div>
                    <div className={styles["form"]}>
                    <div className={styles["input-item"]}>
                            <InputLabel className={styles["label"]} htmlFor="username">Full name</InputLabel>
                            <TextField
                                value={fullname} onChange={(e) => setFullname(e.target.value)} 
                                className={styles["input"]} id="fullname" label="Full name" variant="outlined" />
                        </div>
                        <div className={styles["input-item"]}>
                            <InputLabel className={styles["label"]} htmlFor="username">Username</InputLabel>
                            <TextField 
                                value={username} onChange={(e) => setUsername(e.target.value)}
                                className={styles["input"]} id="username" label="Username" variant="outlined" />
                        </div>
                        <div className={styles["input-item"]}>
                            <InputLabel className={styles["label"]} htmlFor="email">Email</InputLabel>
                            <TextField 
                                value={email} onChange={(e) => setEmail(e.target.value)}
                                className={styles["input"]} id="email" label="Email" variant="outlined" />
                        </div>
                        <div className={styles["input-item"]}>
                            <InputLabel className={styles["label"]} htmlFor="password">Password</InputLabel>
                            <TextField 
                                value={password} onChange={(e) => setPassword(e.target.value)}
                                className={styles["input"]} type="password" id="password" label="Password" variant="outlined" />
                        </div>
                        <div className={styles["input-item"]}>
                            <InputLabel className={styles["label"]} htmlFor="phone">Phone Number</InputLabel>
                            <TextField 
                                value={phone} onChange={(e) => setPhone(e.target.value)}
                                className={styles["input"]} id="phone" label="Phone Number" variant="outlined" />
                        </div>
                        <div className={styles["input-item"]}>
                            <InputLabel className={styles["label"]} htmlFor="gender">Gender</InputLabel>
                            <TextField 
                                value={gender} onChange={(e) => setGender(e.target.value)}
                                className={styles["input"]} id="gender" label="Gender" variant="outlined" />
                        </div>
                        <div className={styles["input-item"]}>
                            <InputLabel className={styles["label"]} htmlFor="birthday">Birthday</InputLabel>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker 
                                    value={birthday} onChange={(newDate) => setBirthday(newDate)}
                                    className={styles["input"]} id="birthday"/>
                            </LocalizationProvider>
                        </div>
                    </div>
                    <div className={styles["button"]}>
                        <button onClick={HandleSignUp}>Sign Up</button>
                    </div>
                </div>
            </div>
        </ThemeProvider>
)}

export default SignUp;