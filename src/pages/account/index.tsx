import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";

import LoggedOut from "@/components/forms/LoggedOutForm";
import LoggedIn from "@/components/forms/LoggedInForm";

import common from "@/styles/common.module.scss";
import c from "./AccountInfo.module.scss"
import TopBar from "@/components/LandingPage/TopBar";

const Spacer = () => <div style={{ flexGrow: 1, minHeight: "4rem" }} />;

const AccountPage: NextPage = () => {

    const { data: sessionData } = useSession();
   
    return (
        <>
            <Head>
                <title>Account</title>
            </Head>
            <main className={common.main}>
              <TopBar title="Account" />

              <Spacer />
              <div className={c.container}>
                {!sessionData /**|| true**/ ? (
                  <LoggedOut />
                  ) : (
                    <LoggedIn/>
                    )}
              </div>
              <Spacer />
            </main>
        </>
    );
};

export default AccountPage;