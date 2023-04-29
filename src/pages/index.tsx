import c from "./index.module.scss";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "@/utils/api";

const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={c.main}>
        <div className={c.container}>
          <h1 className={c.title}>
            Create <span className={c.pinkSpan}>T3</span> App
          </h1>
          <div className={c.cardRow}>
            <Link
              className={c.card}
              href="https://create.t3.gg/en/usage/first-steps"
              target="_blank"
            >
              <h3 className={c.cardTitle}>First Steps →</h3>
              <div className={c.cardText}>
                Just the basics - Everything you need to know to set up your
                database and authentication.
              </div>
            </Link>
            <Link
              className={c.card}
              href="https://create.t3.gg/en/introduction"
              target="_blank"
            >
              <h3 className={c.cardTitle}>Documentation →</h3>
              <div className={c.cardText}>
                Learn more about Create T3 App, the libraries it uses, and how
                to deploy it.
              </div>
            </Link>
          </div>
          <div className={c.showcaseContainer}>
            <AuthShowcase />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <div className={c.authContainer}>
      <p className={c.showcaseText}>
        {sessionData && <span>Logged in as <span className={c.username}>{sessionData.user?.name}</span></span>}
      </p>
      {sessionData ? (
        <button className={c.loginButton} onClick={() => void signOut()}>Logout</button>
      ) : (
        <Link className={c.loginButton} href="/login">Login</Link>
      )}
      <Link
        className={c.loginButton}
        href="/signup"
      >
        Create Account
      </Link>
    </div>
  );
};
