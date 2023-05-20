import { useSession } from "next-auth/react";
//import c from "./LoggedOutForm.module.scss";
import c from "@/components/forms/LoggedOutForm2.module.scss";

import LogoImage from "@/assets/images/logo.png";
import Image from "next/image";
import { AccountCircleRounded, AdjustRounded, ArrowForwardIosRounded } from "@mui/icons-material";

const LoggedIn = () => {
  const { data: sessionData } = useSession();

  return (
    <>
      <header className={c.header}></header>

      <div className={c.outerBorder}>
        <div className={c.innerBorder}>
          <div className={c.userLogoFrame}>
            <AccountCircleRounded />
          </div>
        </div>
      </div>
      <div className={c.edit}>Edit</div>

      <main className={c.main}>
        <div className={c.container1}>
          <div className={c.name}>{sessionData?.user.name}</div>
          <div className={c.email}>{sessionData?.user.email}</div>
        </div>

        <div className={c.container2}>Change password
            <ArrowForwardIosRounded />
        </div>

        <div className={c.container3}>
          <div className={c.about}>About me</div> 
          <div className={c.saySth}>Say something about yourself...
          <ArrowForwardIosRounded />
          </div>
        </div>
      </main>
    </>
  );
};

export default LoggedIn;
