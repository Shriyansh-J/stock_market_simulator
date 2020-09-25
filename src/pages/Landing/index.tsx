import * as React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./landing.css";
import * as routes from "../../constants/routes";
const gsslogo = require("../../assets/img/Logo_Blue-01.png");
const ssnlogo = require("../../assets/img/ieee_ds_black.png");
export const Landing = () => {
  return (
    <div className="background">
      <div className="logos">
        <img src={gsslogo} alt="" width="300px" />
        <img src={ssnlogo} alt="" width="300px" />
      </div>

      <h1
        style={{
          color: "black",
          fontSize: "5em",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Welcome to IEEE Global Skill Summit Stock Market
      </h1>
      <br />
      <div className="btn-grp">
        <Link to={routes.SIGN_UP}>
          <Button className="login-btn">Sign up</Button>
        </Link>

        <Link to={routes.SIGN_IN}>
          {" "}
          <Button className="login-btn">Sign In </Button>
        </Link>
      </div>
    </div>
  );
};
