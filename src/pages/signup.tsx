import React, { useState } from "react";
import SignupForm from "@/components/forms/SignupForm";
import { type NextPage } from "next";
import Head from "next/head";

import common from "../styles/common.module.scss";
import c from "../components/forms/SignupForm.module.scss";

import MenuBar from "@/components/forms/MenuBar";
import PageWithSidebar from "@/components/PageWithSidebar/PageWithSidebar";


const SignupPage: NextPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setMenuVisible(!sidebarOpen); // Menüsichtbarkeit umkehren
  };

  return (
    <>
      {/* <MenuBar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} menuVisible={menuVisible} /> */}
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
