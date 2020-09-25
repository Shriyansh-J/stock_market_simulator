import * as React from "react";
import { Link } from "react-router-dom";
import * as routes from "../../constants/routes";

export const Landing = () => {
  return (
    <div>
      <h2>Landing Page</h2>
      <br />
      <Link to={routes.SIGN_UP}>Signup</Link>
      <Link to={routes.SIGN_IN}>SignIn</Link>
    </div>
  );
};
