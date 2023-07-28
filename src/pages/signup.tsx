import React from "react";
import SignupForm from "@/components/forms/SignupForm";
import { type NextPage } from "next";
import Head from "next/head";

import c from "../components/forms/SignupForm.module.scss";

import PageWithSidebar from "@/components/PageWithSidebar/PageWithSidebar";


const SignupPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      <PageWithSidebar>  
      <main className={c.center}>
        <h1>EventMate</h1>
        {/* <p>Perfectly planned<br /> - unforgettable experience!</p> */}
        <SignupForm />
      </main>
      </PageWithSidebar>
    </>
  );
};

export default SignupPage;
