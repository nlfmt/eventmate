import { signOut, useSession } from "next-auth/react";
//import c from "./LoggedOutForm.module.scss";
import c from "@/components/forms/LoggedInForm.module.scss";

import {
  AccountCircleRounded,
  ArrowForwardIosRounded,
} from "@mui/icons-material";
import Link from "next/link";
import { api } from "@/utils/api";
import React from "react";

const LoggedIn = () => {
  const { data: sessionData } = useSession();

  const { data: user } = api.user.get.useQuery({
    id: sessionData?.user.id ?? "",
  }, {
    enabled: !!sessionData?.user.id,
  });

  const bio = user?.bio?.split("\n");

  return (
    <>
      {/* <header className={c.header}></header> */}

      <div className={c.outerBorder}>
        <div className={c.innerBorder}>
          <div className={c.userLogoFrame}>
            <AccountCircleRounded />
          </div>
        </div>
      </div>

      <main className={c.main}>
        <div className={c.info}>
          <span className={c.name}>{sessionData?.user.name}</span>
          <span className={c.email}>{sessionData?.user.email}</span>
        </div>
        <div className={c.container1}>
          <span>
            {bio ? bio.map((line, index) => (
              <React.Fragment key={index}>
                {line}
                {index < bio.length - 1 && <br />}
              </React.Fragment>
            )) : <span style={{ opacity: 0.5 }}>Add a Bio below...</span>}
          </span>
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

        <div className={c.container2} onClick={() => {
          signOut({
            callbackUrl: "/login",
          });
        }}>
          Logout
          <ArrowForwardIosRounded />
        </div>
      </main>
    </>
  );
};

export default LoggedIn;
