import React, { useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { ProfileName } from "../atoms/TextsGlobal";
import { Link } from "react-router-dom";
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';


function Profile({ open, text, setMenu, imagen }) {
  const cld = new Cloudinary({ cloud: { cloudName: 'dhuutno2p' } });
  useEffect(() => {
    console.log('imagen', imagen.profileImage)
  },[])
  return (
    <div
      className={`flex w-full items-center ${
        open ? "justify-evenly" : "mt-2 justify-center"
      }`}
    >
      <Link onClick={() => setMenu() } to="/Profile" className={`flex items-center w-full  ${open ? "" : "justify-center"}`}>
        { !imagen.profileImage ?  <CgProfile className={`max-sm:w-7  max-sm:h-7 ${open?'w-7 h-7 max-sm:mx-0 mx-2 ':'w-8 h-8'} text-white`} />
        :<AdvancedImage cldImg={cld
          .image(imagen.profileImage)
          .format('auto')
          .quality('auto')
          .resize(auto().gravity(autoGravity()).width(500).height(500))}  className={`max-sm:w-7 rounded-full  max-sm:h-7 ${open?'w-7 h-7 max-sm:mx-0 mx-2 ':'w-8 h-8'} text-white`} /> }
        {open && <ProfileName hidden={'max-sm:hidden'} text={text.slice(0, 18) + (text.length > 18 ? ' ...' : '')} />}
      </Link>
    </div>
  );
}

export default Profile;
