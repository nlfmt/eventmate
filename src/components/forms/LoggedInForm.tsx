import { useSession } from "next-auth/react";
//import c from "./LoggedOutForm.module.scss";
import c from "@/components/forms/LoggedInForm.module.scss";

import {
  AccountCircleRounded,
  AdjustRounded,
  ArrowForwardIosRounded,
  EditRounded,
} from "@mui/icons-material";
import Link from "next/link";

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
          <div>
            <span className={c.name}>{sessionData?.user.name}</span>
            <br />
            <span className={c.email}>{sessionData?.user.email}</span>
          </div>
        </div>
        <div className={c.container1}>
          <span>Bioooooo</span>
          <br />
          {/* <span>ggrgrg</span> */}
        </div>
        
        <div className={c.seperator}></div>

        <Link className={c.container3} href="/account/edit/user">
          <div className={c.about}>
            <span>Change User Data</span>
            <br />
            <span className={c.saySth}>Update your username, email or bio</span>
          </div>
          <ArrowForwardIosRounded />
        </Link>

        <Link className={c.container2} href="/account/edit/password">
          Change password
          <ArrowForwardIosRounded />
        </Link>

      </main>
    </>
  );
};

export default LoggedIn;
