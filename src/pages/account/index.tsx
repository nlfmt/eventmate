import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";

import LoggedOut from "@/components/forms/LoggedOutForm";
import LoggedIn from "@/components/forms/LoggedInForm";

import common from "@/styles/common.module.scss";
import c from "./AccountInfo.module.scss";
import TopBar from "@/components/LandingPage/TopBar";
import PageWithSidebar from "@/components/PageWithSidebar/PageWithSidebar";

const Spacer = () => <div style={{ flexGrow: 1, minHeight: "4rem" }} />;

const AccountPage: NextPage = () => {
  const { data: sessionData } = useSession();

  return (
    <>
      <Head>
        <title>Account</title>
      </Head>
      <PageWithSidebar topbar={{ title: "Account" }}>
        <Spacer />
        <div className={c.container}>
          {!sessionData /**|| true**/ ? <LoggedOut /> : <LoggedIn />}
        </div>
        <Spacer />
      </PageWithSidebar>
    </>
  );
};

export default AccountPage;
