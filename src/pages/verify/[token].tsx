import PageWithSidebar from '@/components/PageWithSidebar/PageWithSidebar';
import { api } from '@/utils/api';
import { type NextPage } from 'next'
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router'
import React from 'react'

import c from "./VerifyPage.module.scss";


const VerifyPage: NextPage = () => {

  const router = useRouter();

  const { isSuccess, data } = api.auth.verifyEmail.useQuery({
    token: router.query.token as string
  }, {
    enabled: router.isReady
  });

  if (!router.isReady) return null;

  return (
    <>
      <Head>
        <title>Verify</title>
        <meta
          name="description"
          content="Verify your Email Address"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageWithSidebar>
        <div className={c.main}>
        <div className={c.center}>
          {isSuccess && data ? (
              <>
                <h1>Email Verified</h1>
                <p>Your email <span style={{ color: "var(--green)" }}>{data}</span> has been successfully verified.</p>
              </>
          ) : (
              <>
                <h1>Invalid Token</h1>
                <p>You may have already verified your account or the link has expired.</p>
              </>
          )}
        </div>
        </div>
      </PageWithSidebar>
    </>
  )
}

export default VerifyPage