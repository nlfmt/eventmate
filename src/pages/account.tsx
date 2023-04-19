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
    
    //hier zwei separate components erstellen
    return (
        <>
            <Head>
                <title>Account</title>
            </Head>
            <main> 
                {!sessionData ? (
                    <>
                        <div>not logged in</div>
                        <Link href="/login" >Login</Link>
                    </>
                ) : (
                    <div>
                        User: {sessionData.user.name}
                        EMail: {sessionData.user.email}
                    </div>
                )}
            </main>
        </>
    );
};

export default AccountPage;