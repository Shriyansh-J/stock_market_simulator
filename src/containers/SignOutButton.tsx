import * as React from "react";
import { auth } from "../firebase";
import "../pages/SignIn/signin.css";

export const SignOutButton = () => (
  <button
    type="button"
    style={{ margin: " 10px 30%" }}
    className="login-btn"
    onClick={auth.doSignOut}
  >
    Sign Out
  </button>
);
