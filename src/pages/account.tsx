import LoginForm from "@/components/forms/LoginForm";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import Router, { useRouter } from "next/router";

const AccountPage: NextPage = () => {
    const router = useRouter()

    const { data: sessionData } = useSession();

    if (!sessionData) {
        // router.push("/login");
    }
    
    const NotLoggedIn = () => {
        return (
            <>
                <div>not logged in</div>
                <Link href="/login" >Login</Link>
            </>
        );
    };

    const LoggedIn = () => {
        return (
            <>
                <div>
                    User: {sessionData?.user.name}
                    EMail: {sessionData?.user.email}
                </div>
            </>
        );
    };

    return (
        <>
            <Head>
                <title>Account</title>
                <h1>Account Information</h1>
            </Head>
            <main> 
                {!sessionData ? (
                    <NotLoggedIn />
                ) : (
                    <LoggedIn/>
                )}
            </main>
        </>
    );
};

export default AccountPage;