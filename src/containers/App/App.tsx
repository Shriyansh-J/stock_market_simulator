import * as React from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch, BrowserRouter } from "react-router-dom";
import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import { NotificationSystemFrame } from "../../components/NotificationSystem";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import appRoutes from "../../routes/routes";
import { AppState } from "../../state/AppState";
import { getStockValue } from "../../state/depot/depotSelector";
import { loadState } from "../../state/initialLoad/initialLoadActions";
import Depot from "../../views/Depot/Depot";
import Market from "../../views/Market/Market";
import Quests from "../../views/Quests/Quests";

import * as routes from "../../constants/routes";
import { firebase } from "../../firebase";
import { withAuthentication } from "../../firebase/withAuthentication";
import { Account } from "../../pages/Account";
import { Home } from "../../pages/Home";
import { Landing } from "../../pages/Landing";
import { PasswordForget } from "../../pages/PasswordForget";
import { SignIn } from "../../pages/SignIn";
import { SignUp } from "../../pages/SignUp";

interface AppProps {
  currentMoney: number;
  currentStockBalance: number;
  loadState: () => void;
}

class AppComponent extends React.Component<AppProps> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      authUser: null,
    };
  }

  public componentDidMount() {
    firebase.auth.onAuthStateChanged((authUser) => {
      authUser
        ? this.setState(() => ({ authUser }))
        : this.setState(() => ({ authUser: null }));
    });
  }

  componentWillMount() {
    this.props.loadState();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="wrapper">
          <NotificationSystemFrame />
          <div id="main-panel" className="main-panel">
            <Header {...this.props} />
            <Switch>
              <Route exact={true} path={routes.LANDING} component={Landing} />
              <Route exact={true} path={routes.SIGN_UP} component={SignUp} />
              <Route exact={true} path={routes.SIGN_IN} component={SignIn} />
              <Route
                exact={true}
                path={routes.PASSWORD_FORGET}
                component={PasswordForget}
              />
              <Sidebar
                currentBalance={this.props.currentMoney}
                currentStockBalance={this.props.currentStockBalance}
              />
              <Route exact={true} path={routes.HOME} component={Home} />
              <Route exact={true} path={routes.DEPOT} component={Depot} />
              <Route exact={true} path={routes.MARKET} component={Market} />
              <Route exact={true} path={routes.QUESTS} component={Quests} />
              <Route exact={true} path={routes.ACCOUNT} component={Account} />
              {appRoutes.map((prop, key) => {
                if (prop.redirect) {
                  return <Redirect path={prop.path} to={prop.to!} key={key} />;
                }
                return (
                  <Route
                    path={prop.path}
                    component={prop.component}
                    key={key}
                  />
                );
              })}
              <Footer />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  currentMoney: state.depot.accountValue,
  currentStockBalance: getStockValue(state),
});

// tslint:disable-next-line:no-any
const mapDispatchToProps = (dispatch: any) => ({
  loadState: () => dispatch(loadState()),
});

export const App = withAuthentication(
  connect(mapStateToProps, mapDispatchToProps)(AppComponent)
);
