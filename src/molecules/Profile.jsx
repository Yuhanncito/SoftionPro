import React from "react";
import { CgProfile } from "react-icons/cg";
import { ProfileName } from "../atoms/TextsGlobal";
import { Link } from "react-router-dom";

function Profile({ open, text, setMenu, imagen }) {
  return (
    <div
      className={`flex w-full items-center ${
        open ? "justify-evenly" : "mt-2 justify-center"
      }`}
    >
      <Link onClick={() => setMenu() } to="/Profile" className={`flex items-center w-full  ${open ? "" : "justify-center"}`}>
        { !imagen ?  <CgProfile className={`max-sm:w-7  max-sm:h-7 ${open?'w-7 h-7 max-sm:mx-0 mx-2 ':'w-8 h-8'} text-white`} />
        :<img src="/images/Profile/profile.jpg" alt=""  className={`max-sm:w-7 rounded-full  max-sm:h-7 ${open?'w-7 h-7 max-sm:mx-0 mx-2 ':'w-8 h-8'} text-white`} /> }
        {open && <ProfileName hidden={'max-sm:hidden'} text={text.slice(0, 18) + (text.length > 18 ? ' ...' : '')} />}
      </Link>
    </div>
  );
}

export default Profile;
