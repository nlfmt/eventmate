import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";

import common from "@/styles/common.module.scss";
import ChangeAccountInfo from "@/components/forms/ChangeAccountInfo";

const AccountPage: NextPage = () => {

    const { data: sessionData } = useSession();
   
    return (
        <>
            <Head>
                <title>Account</title>
            </Head>
            <main className={common.main}> 
              <ChangeAccountInfo />
            </main>
        </>
    );
};

export default AccountPage;