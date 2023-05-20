import LoginForm from "@/components/forms/LoginForm";
import { NextPage } from "next";
import Head from "next/head";

import common from "../styles/common.module.scss"
import c from "../components/forms/SignupForm.module.scss"
import Sidebar from "@/components/forms/Sidebar";

const LoginPage: NextPage = () => {

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <main className={common.main}>
        <Sidebar />
        <div className={c.center}>
          <h1>Event Mate</h1>
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
