import React, { useRef, useState } from "react";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import LoginModal from "./Header/LoginModal";
import LoginModalForm from "./Header/LoginModalForm";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ToggleOffOutlinedIcon from "@material-ui/icons/ToggleOffOutlined";
import Brightness2OutlinedIcon from "@material-ui/icons/Brightness2Outlined";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import LanguageIcon from "@material-ui/icons/Language";
import { CSSTransition } from "react-transition-group";
import DropdownMenu from "./DropdownMenu";
const FirstIconRight = () => {
  const modalRef = React.useRef();
  const [lan, setLan] = useState(false);
  const openLoginModal = () => {
    modalRef.current.openModal();
  };

  return (
    <ul style={{ backgroundColor: "white" }}>
      <li onClick={() => setLan(!lan)}>
        <div>
          <LanguageIcon />
          <span>Language</span>
        </div>
        <ChevronRightIcon />
      </li>
      <li>
        <div>
          <Brightness2OutlinedIcon />
          <span>Dark Theme</span>
        </div>
        <ToggleOffOutlinedIcon />
      </li>

      <hr />

      <li onClick={() => openLoginModal()}>
        <div>
          <ExitToAppIcon />
          <span style={{ marginLeft: "7px" }}>Log In</span>
          <LoginModal ref={modalRef}>
            <i
              onClick={() => modalRef.current.close()}
              className="window__icon large window close icon"
            ></i>
            <LoginModalForm />
          </LoginModal>
        </div>
      </li>
    </ul>
  );
};
export default FirstIconRight;

// {
//   /* <ul style={{ backgroundColor: "white" }}>
// <li onClick={() => this.setState()}>
//   <div>
//     <LanguageIcon />
//     <span>Language</span>
//   </div>
//   <ChevronRightIcon />
// </li>
// <li>
//   <div>
//     <Brightness2OutlinedIcon />
//     <span>Dark Theme</span>
//   </div>
//   <ToggleOffOutlinedIcon />
// </li>
// <hr />
// <li onClick={() => this.openLoginModal()}>
//   <div onClick={(e) => e.stopPropagation()}>
//     <ExitToAppIcon />
//     <span style={{ marginLeft: "7px" }}>Log In</span>
//     <LoginModal ref={this.modalRef}>
//       <i
//         onClick={() => this.modalRef.current.close()}
//         className="window__icon large window close icon"
//       ></i>
//       <LoginModalForm />
//     </LoginModal>
//   </div>
// </li>
// </ul> */
// }
{
  /* <ul style={{ backgroundColor: "white" }}>
<li onClick={() => this.setState()}>
  <div>
    <LanguageIcon />
    <span>Language</span>
  </div>
  <ChevronRightIcon />
</li>
<li>
  <div>
    <Brightness2OutlinedIcon />
    <span>Dark Theme</span>
  </div>
  <ToggleOffOutlinedIcon />
</li>
<hr />
<li onClick={() => this.openLoginModal()}>
  <div onClick={(e) => e.stopPropagation()}>
    <ExitToAppIcon />
    <span style={{ marginLeft: "7px" }}>Log In</span>
    <LoginModal ref={this.modalRef}>
      <i
        onClick={() => this.modalRef.current.close()}
        className="window__icon large window close icon"
      ></i>
      <LoginModalForm />
    </LoginModal>
  </div>
</li>
</ul> */
}
