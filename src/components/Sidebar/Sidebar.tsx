import * as React from "react";
import { SidebarLinks } from "./SidebarLinks";
import { PriceTag } from "../PriceTag";
import {} from "src/firebase/firebase";
const logo = require("../../assets/img/Logo_Blue-01.png");

interface SidebarProps {
  currentBalance: number;
  currentStockBalance: number;
}

interface SidebarState {
  width: number;
}

export class Sidebar extends React.Component<SidebarProps, SidebarState> {
  constructor(props: SidebarProps) {
    super(props);
    this.state = {
      width: window.innerWidth,
    };
  }

  updateDimensions() {
    this.setState({ width: window.innerWidth });
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  renderLogo() {
    return (
      <div className="logo">
        <a href="/" className="simple-text logo-small">
          <div className="logo-img">
            <img src={logo} width="70px" alt="logo_image" />
          </div>
        </a>
        <a href="/" className="simple-text logo-normal">
          Stockmarket
        </a>
      </div>
    );
  }

  render() {
    return (
      <div id="sidebar" className="sidebar" data-color="black">
        {this.renderLogo()}

        <div className="sidebar-wrapper">
          <ul className="nav">
            <SidebarLinks />
            <li>
              <hr className="currentBalance-hr" />
              <p className="currentBalance-p">
                Account Balance: <PriceTag value={this.props.currentBalance} />
                <br />
                Stock Balance:{" "}
                <PriceTag value={this.props.currentStockBalance} />
              </p>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
