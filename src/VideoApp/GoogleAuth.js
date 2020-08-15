import React, { Fragment } from "react";
import "./GoogleAuth.css";
import { Link } from "react-router-dom";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import LanguageIcon from "@material-ui/icons/Language";
import { signIn, signOut } from "./actions/index";
import { connect } from "react-redux";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import LoginModal from "./Header/LoginModal";
import LoginModalForm from "./Header/LoginModalForm";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ToggleOffOutlinedIcon from "@material-ui/icons/ToggleOffOutlined";
import Brightness2OutlinedIcon from "@material-ui/icons/Brightness2Outlined";
import FirstIconRight from "./FirstIconRight";

class GoogleAuth extends React.Component {
  constructor(props) {
    super(props);
    this.modalRef = React.createRef();
    this.state = {
      open: false,
    };
  }

  openLoginModal = () => {
    this.modalRef.current.openModal();
  };

  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "1039122878379-b81ks1uqmmh4frc0dl9rm1ut4rg2708f.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      const profile = this.auth.currentUser.get().getBasicProfile();
      this.props.signIn(profile);
    } else {
      this.props.signOut();
    }
  };
  onSignIn = () => {
    this.auth.signIn();
  };
  onSignOut = () => {
    this.auth.signOut();
  };
  renderButton() {
    if (this.props.isSignedIn === null) {
      return;
    } else if (this.props.isSignedIn) {
      return (
        <div
          style={{ backgroundColor: "white", border: "1px solid red" }}
          className="dropdown__auth"
        >
          <ul id="log__in__auth2">
            <li>
              <AccountCircleIcon />
              <a onClick={this.onSignOut} href="#">
                Logout
              </a>
            </li>
            <li>
              <a onClick={this.onSignOut} href="#">
                <AccountCircleIcon />
              </a>
            </li>
            <li>
              <img className="auth__logged__in" src={this.props.userImage} />
            </li>
            <li>
              <a href="#">ProfileProfileProfile</a>
            </li>
          </ul>
        </div>
      );
    } else {
      return (
        <div className="dropdown__auth">
          <FirstIconRight />
        </div>
      );
    }
  }

  render() {
    return <Fragment>{this.renderButton()}</Fragment>;
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    userId: state.auth.userId,
    userImage: state.auth.userImage,
  };
};
export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
