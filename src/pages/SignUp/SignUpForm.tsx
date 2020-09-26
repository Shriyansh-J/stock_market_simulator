import * as React from "react";
import { Link } from "react-router-dom";
import * as routes from "../../constants/routes";
import { auth, db } from "../../firebase";

interface InterfaceProps {
  email?: string;
  error?: any;
  history?: any;
  passwordOne?: string;
  passwordTwo?: string;
  username?: string;
}

interface InterfaceState {
  email: string;
  error: any;
  passwordOne: string;
  passwordTwo: string;
  username: string;
}

export class SignUpForm extends React.Component<
  InterfaceProps,
  InterfaceState
> {
  private static INITIAL_STATE = {
    email: "",
    error: null,
    passwordOne: "",
    passwordTwo: "",
    username: "",
  };

  private static propKey(propertyName: string, value: any): object {
    return { [propertyName]: value };
  }

  constructor(props: InterfaceProps) {
    super(props);
    this.state = { ...SignUpForm.INITIAL_STATE };
  }

  public onSubmit = (event: any) => {
    event.preventDefault();

    console.log(this.props);
    const { email, passwordOne, username } = this.state;
    const { history } = this.props;

    auth
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then((authUser: any) => {
        // Create a user in your own accessible Firebase Database too
        db.doCreateUser(authUser.user.uid, username, email, 0)
          .then(() => {
            this.setState(() => ({ ...SignUpForm.INITIAL_STATE }));
            history.push(routes.HOME);
          })
          .catch((error) => {
            this.setState(SignUpForm.propKey("error", error));
          });
      })
      .catch((error) => {
        this.setState(SignUpForm.propKey("error", error));
      });
  };

  public Mymsg(props: any) {
    const isLoggedIn = props.isCorrect;
    if (
      isLoggedIn &&
      isLoggedIn.message === "Cannot read property 'push' of undefined"
    ) {
      return <Link to={routes.SIGN_IN}>Log In</Link>;
    } else if (isLoggedIn) {
      return <h1>{isLoggedIn.message}</h1>;
    }
    return null;
  }

  public render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      username === "";

    return (
      <div className="container">
        <form
          style={{ margin: "2em", padding: "2em" }}
          className="white"
          onSubmit={(event) => this.onSubmit(event)}
        >
          <h5 className="grey-text text-darken-3 center-align">Sign Up</h5>
          <div className="input-field">
            <input
              value={username}
              onChange={(event) => this.setStateWithEvent(event, "username")}
              type="text"
              placeholder="Full Name"
            />
          </div>

          <div className="input-field">
            <input
              value={email}
              onChange={(event) => this.setStateWithEvent(event, "email")}
              type="text"
              placeholder="Email Address"
            />
          </div>

          <div className="input-field">
            <input
              value={passwordOne}
              onChange={(event) => this.setStateWithEvent(event, "passwordOne")}
              type="password"
              placeholder="Password"
            />
          </div>

          <div className="input-field">
            <input
              value={passwordTwo}
              onChange={(event) => this.setStateWithEvent(event, "passwordTwo")}
              type="password"
              placeholder="Confirm Password"
            />
          </div>

          <div className="input-field center-align">
            <button className="signup-btn" disabled={isInvalid} type="submit">
              Sign Up
            </button>
          </div>
          <this.Mymsg isCorrect={error} />
        </form>
      </div>
    );
  }

  private setStateWithEvent(event: any, columnType: string) {
    this.setState(SignUpForm.propKey(columnType, (event.target as any).value));
  }
}
