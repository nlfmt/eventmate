import LoginForm from "@/components/forms/LoginForm";
import { NextPage } from "next";
import Head from "next/head";

const LoginPage: NextPage = () => {

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <main>
        <h1>Login</h1>
        <LoginForm />
      </main>
    </>
  );
};

export default LoginPage;
