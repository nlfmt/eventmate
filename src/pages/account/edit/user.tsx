import { type NextPage } from "next";
import Head from "next/head";

import common from "@/styles/common.module.scss";
import ChangeAccountInfoForm from "@/components/forms/ChangeAccountInfo";

const AccountPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Account</title>
      </Head>
      <main className={common.main}>
        <ChangeAccountInfoForm />
      </main>
    </>
  );
};

export default AccountPage;
