import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import Router, { useRouter } from "next/router";

import LoggedOut from "@/components/forms/LoggedOutForm";
import LoggedIn from "@/components/forms/LoggedInForm";

const AccountPage: NextPage = () => {

    const { data: sessionData } = useSession();
   
    return (
        <>
            <Head>
                <title>Account</title>
                <h1>Account Information</h1>
            </Head>
            <main> 
                {!sessionData ? (
                    <LoggedOut />
                ) : (
                    <LoggedIn/>
                )}
            </main>
        </>
    );
};

export default AccountPage;