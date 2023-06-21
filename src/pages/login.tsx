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
        <div className={c.center}>
          <h1>EventMate</h1>
          <p>
            Perfectly planned
            <br /> - unforgettable experience!
          </p>
          <LoginForm />
        </div>
      </main>
    </>
  );
};

export default LoginPage;
