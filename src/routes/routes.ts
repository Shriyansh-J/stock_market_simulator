import Depot from "../views/Depot/Depot";
import Market from "../views/Market";
import Quests from "../views/Quests";
import { SignUp } from "../pages/SignUp";
import { SignIn } from "../pages/SignIn";
import { PasswordForget } from "../pages/PasswordForget";
import { Landing } from "../pages/Landing";

export interface AppRoute {
  path: string;
  name: string;
  icon?: string;
  // tslint:disable-next-line no-any
  component?: any;
  upgrade?: boolean;
  redirect?: boolean;
  to?: string;
}

const appRoutes: AppRoute[] = [
  {
    path: "/password_forget",
    name: "forgot",
    icon: "pe-7s-wallet",
    component: PasswordForget,
  },
  { path: "/home", name: "home", icon: "pe-7s-wallet", component: Depot },
  { path: "/signup", name: "signup", icon: "pe-7s-wallet", component: SignUp },
  { path: "/signin", name: "signin", icon: "pe-7s-wallet", component: SignIn },
  { path: "/depot", name: "Depot", icon: "pe-7s-wallet", component: Depot },
  { path: "/market", name: "Market", icon: "pe-7s-graph1", component: Market },
  { path: "/quests", name: "Quests", icon: "pe-7s-note2", component: Quests },
  { path: "/", name: "landing", icon: "pe-7s-wallet", component: Landing },
];

export default appRoutes;
