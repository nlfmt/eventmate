import SignupForm from "@/components/forms/SignupForm";
import { NextPage } from "next";
import Head from "next/head";

import common from "../styles/common.module.scss"
import c from "../components/forms/SignupForm.module.scss"

const SignupPage: NextPage = () => {

  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      <main className={common.main}>
        <h1 className={c.text}>Event Mate</h1>
        <SignupForm />
        <p className={c.text}>Already have an account? <a href="Link-Ziel" className={c.link}> Log in</a></p>
      </main>
    </>
  );
};

export default SignupPage;
