import * as React from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch, BrowserRouter } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { NotificationSystemFrame } from "../../components/NotificationSystem";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import appRoutes from "../../routes/routes";
import { AppState } from "../../state/AppState";
import { getStockValue } from "../../state/depot/depotSelector";
import { loadState } from "../../state/initialLoad/initialLoadActions";

import { firebase } from "../../firebase";
import { withAuthentication } from "../../firebase/withAuthentication";

import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";

import "./Myapp.css";

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
            <Sidebar
              currentBalance={this.props.currentMoney}
              currentStockBalance={this.props.currentStockBalance}
            />
            <Switch>
              {appRoutes.map((prop, key) => {
                if (prop.redirect) {
                  return <Redirect path={prop.path} to={prop.to!} key={key} />;
                }
                return (
                  <Route
                    exact
                    path={prop.path}
                    component={prop.component}
                    key={key}
                  />
                );
              })}
            </Switch>
            <NotificationContainer className="notification" />
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
