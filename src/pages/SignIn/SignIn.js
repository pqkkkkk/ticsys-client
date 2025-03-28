import React from "react";
import styles from "./SignIn.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignInApi } from "../../services/api/AccountApi";
import { setUserSession, setToken } from "../../services/UserStorageService";
function SignIn() {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const navigate = useNavigate();
    const HandleSignIn = async () => {
        const signInRequest = {
            userName: username,
            passWord: password
        };
        if(!username || !password)
        {
            alert("Please fill in all fields");
            return;
        }
        const response = await SignInApi(signInRequest);
        if(response){
            console.log(response);
            if(response.authenticated === true)
            {
                alert(response.message);
                setUserSession(response.user);
                setToken(response.token);
                navigate("/");
            }
            else
            {
                alert(response.message);
            }
    };
}
  return (
    <div className={styles["container"]}>
      <div className={styles["left-section"]}>
        <div className={styles["app-name"]}>
          <h1>TicSys</h1>
        </div>
        <main>
          <div className={styles["welcome-text"]}>
            <h2>Log in to your Account</h2>
            <p>Welcome back! Select method to log in:</p>
          </div>
          <div className={styles["social-login"]}>
            <button>Google</button>
            <button>Facebook</button>
          </div>
          <p>or continue with username</p>
          <div className={styles["login-form"]}>
                <label htmlFor="username">Username</label>
                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} 
                    type="text" id="username"
                    placeholder="Enter your username" />
                <label htmlFor="password">Password</label>
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    type="password" id="password" placeholder="Enter your password" />
                <div className={styles["options"]}>
                <div className={styles["forgot-password"]}>
                    <a href="#">Forgot Password?</a>
                </div>
                </div>
                <button onClick={HandleSignIn}>Log in</button>
          </div>
          <p>Don’t have an account? <a href="#">Create an account</a></p>
        </main>
      </div>
    </div>
  );
}

export default SignIn;