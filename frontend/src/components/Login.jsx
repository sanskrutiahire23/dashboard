import React, { useState, useEffect } from "react";
import { signInWithGoogle, logout } from "./Firebaseconfig";
import "./Login.css";

function Login({ setUser }) {
    const [user, setLocalUser] = useState(null);

    useEffect(() => {
        if (user && setUser) {
            setUser(user);  
        }
    }, [user, setUser]);

    const handleLogin = async () => {
        try {
            const userInfo = await signInWithGoogle();
            setLocalUser(userInfo);
            if (setUser) {
                setUser(userInfo);  
            }
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <div>
            {!user ? (
                <button id="sign" onClick={handleLogin}>Sign in</button>
            ) : null}
        </div>
    );
}

export default Login;
