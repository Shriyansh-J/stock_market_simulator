import * as React from "react";
import { NavLink, withRouter } from "react-router-dom";
import * as routes from "../../constants/routes";
import { SignUpForm } from "./SignUpForm";
import "./signup.css";

const SignUpComponent = () => (
  <div>
    <SignUpForm />
  </div>
);

export const SignUpLink = () => (
  <p style={{ backgroundColor: "white", padding: "10px" }}>
    Don't have an account?{" "}
    <NavLink className="link" to={routes.SIGN_UP}>
      Sign Up
    </NavLink>
  </p>
);

export const SignUp = withRouter(SignUpComponent);
