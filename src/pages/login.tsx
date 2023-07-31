import LoginForm from "@/components/forms/LoginForm";
import { type NextPage } from "next";
import Head from "next/head";

import c from "../components/forms/SignupForm.module.scss"
import PageWithSidebar from "@/components/PageWithSidebar/PageWithSidebar";

const LoginPage: NextPage = () => {

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <PageWithSidebar>
        <div className={c.center}>
          <h1>EventMate</h1>
          <p>
            Perfectly planned
            <br /> - unforgettable experience!
          </p>
          <LoginForm />
        </div>
      </PageWithSidebar>
    </>
  );
};

export default LoginPage;
