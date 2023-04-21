import LoginForm from "@/components/forms/LoginForm";
import { NextPage } from "next";
import Head from "next/head";

import common from "../styles/common.module.scss"
import c from "../components/forms/SignupForm.module.scss"

const LoginPage: NextPage = () => {

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <main className={common.main}>
        <h1 className={c.text}>Event Mate</h1>
        <p className={c.text}>Perfectly planned<br></br>-unforgettable experience!</p>
        <LoginForm />
        <p className={c.text}>Don't have an account? <a href="Link-Ziel" className={c.link}> Sign up</a></p>
      </main>
    </>
  );
};

export default LoginPage;
