import SignupForm from "@/components/forms/SignupForm";
import { NextPage } from "next";
import Head from "next/head";

const SignupPage: NextPage = () => {

  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      <main>
        <h1>Sign Up</h1>
        <SignupForm />
      </main>
    </>
  );
};

export default SignupPage;
