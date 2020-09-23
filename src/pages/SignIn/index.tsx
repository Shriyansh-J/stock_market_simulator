import * as React from "react";
import { withRouter } from "react-router-dom";
// import { PasswordForgetLink } from "../PasswordForget";
import { SignUpLink } from "../SignUp";
import { SignInForm } from "./SignInForm";

const SignInComponent = ({ history }: { [key: string]: any }) => (
  <div>
    <SignInForm history={history} />
    <SignUpLink />
  </div>
);

export const SignIn = withRouter(SignInComponent);
