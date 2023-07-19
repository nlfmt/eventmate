import LoginForm from "@/components/forms/LoginForm";
import { type NextPage } from "next";
import Head from "next/head";

import common from "../styles/common.module.scss"
import c from "../components/forms/SignupForm.module.scss"
import PageWithSidebar from "@/components/PageWithSidebar/PageWithSidebar";
import LocationSelectDialog, { Location } from "@/components/LocationSelectDialog/LocationSelectDialog";
import { useState } from "react";

const LoginPage: NextPage = () => {

  const [location, setLocation] = useState<Location | null>(null);

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
          <LocationSelectDialog selected={location} setSelected={setLocation} />
        </div>
      </PageWithSidebar>
    </>
  );
};

export default LoginPage;
