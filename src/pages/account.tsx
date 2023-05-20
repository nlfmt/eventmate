import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";

import LoggedOut from "@/components/forms/LoggedOutForm";
import LoggedIn from "@/components/forms/LoggedInForm";

import common from "@/styles/common.module.scss";

const AccountPage: NextPage = () => {

    const { data: sessionData } = useSession();
   
    return (
        <>
            <Head>
                <title>Account</title>
            </Head>
            <main className={common.main}> 
                {!sessionData || true ? (
                    <LoggedIn />
                ) : (
                    <LoggedOut/>
                )}
            </main>
        </>
    );
};

export default AccountPage;