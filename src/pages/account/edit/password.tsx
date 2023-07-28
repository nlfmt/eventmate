import { type NextPage } from "next";
import Head from "next/head";

import common from "@/styles/common.module.scss";
import ChangePassword from "@/components/forms/ChangePassword";

const AccountPage: NextPage = () => {
    return (
        <>
            <Head>
                <title>Account</title>
            </Head>
            <main className={common.main}> 
              <ChangePassword />
            </main>
        </>
    );
};

export default AccountPage;