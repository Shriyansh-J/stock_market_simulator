import * as React from "react";
import * as routes from "../../constants/routes";
import { auth } from "../../firebase";

interface InterfaceProps {
  email?: string;
  error?: any;
  history?: any;
  password?: string;
}

interface InterfaceState {
  email: string;
  error: any;
  password: string;
}

export class SignInForm extends React.Component<
  InterfaceProps,
  InterfaceState
> {
  private static INITIAL_STATE = {
    email: "",
    error: null,
    password: "",
  };

  private static propKey(propertyName: string, value: any): object {
    return { [propertyName]: value };
  }

  constructor(props: InterfaceProps) {
    super(props);

    this.state = { ...SignInForm.INITIAL_STATE };
  }

  public onSubmit = (event: any) => {
    const { email, password } = this.state;

    const { history } = this.props;

    auth
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...SignInForm.INITIAL_STATE }));
        history.push(routes.HOME);
      })
      .catch((error) => {
        this.setState(SignInForm.propKey("error", error));
      });

    event.preventDefault();
  };

  public render() {
    const { email, password, error } = this.state;

    const isInvalid = password === "" || email === "";

    return (
      <div className="container">
        <form
          style={{ margin: "2em", padding: "2em" }}
          className="white"
          onSubmit={(event) => this.onSubmit(event)}
        >
          <h5 className="grey-text text-darken-3 center-align">Log In</h5>
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
              value={password}
              onChange={(event) => this.setStateWithEvent(event, "password")}
              type="password"
              placeholder="Password"
            />
          </div>
          <div className="input-field center-align">
            <button
              className="btn white-text teal darken-1"
              disabled={isInvalid}
              type="submit"
            >
              Log In
            </button>
          </div>
          {error && <p>{error.message}</p>}
        </form>
      </div>
    );
  }

  private setStateWithEvent(event: any, columnType: string): void {
    this.setState(SignInForm.propKey(columnType, (event.target as any).value));
  }
}
