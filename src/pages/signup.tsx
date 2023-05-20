import SignupForm from "@/components/forms/SignupForm";
import { NextPage } from "next";
import Head from "next/head";

import common from "../styles/common.module.scss"
import c from "../components/forms/SignupForm.module.scss"
import MenuBar from "@/components/forms/MenuBar";

const SignupPage: NextPage = () => {

  return (
    <>
    <MenuBar />
      <Head>
        <title>Sign Up</title>
      </Head>
      <div className={common.main}>  
      <main className={c.center}>
        <h1>Event Mate</h1>
        <p>Perfectly planned<br /> - unforgettable experience!</p>
        <SignupForm />
      </main>
      </div>
    </>
  );
};

export default SignupPage;
