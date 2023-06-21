import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "@/utils/api";

import "@/styles/globals.scss";
import OverlayContext from "@/contexts/OverlayContext";
import { useState } from "react";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [overlayCount, setOverlayCount] = useState<number>(0);

  function addOverlay() {
    setOverlayCount((v) => v + 1);
  }
  function rmOverlay() {
    setOverlayCount((v) => v - 1);
  }
  function setOverlay(v: boolean) {
    setOverlayCount((v) => (v ? v + 1 : v - 1));
  }

  return (
    <SessionProvider session={session}>
      <OverlayContext.Provider
        value={{ overlay: !!overlayCount, addOverlay, rmOverlay, setOverlay }}
      >
        <Component {...pageProps} />
      </OverlayContext.Provider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
