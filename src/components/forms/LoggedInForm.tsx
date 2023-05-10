import { useSession } from "next-auth/react";
import c from "./LoggedOutForm.module.scss";

const LoggedIn = () => {
  const { data: sessionData } = useSession();

  return (
    <>
        <h1 className={c["h1"]}>Account Information</h1>
        <div className="c.user-logo-frame">
          <img src="/src/assets/images/logo.png" alt="User Logo" />
        </div>
        <div className={c["user-info"]}>
            <p>Edit</p>
          User: {sessionData?.user.name} <br />
          EMail: {sessionData?.user.email}
        </div>
    </>
  );
};

export default LoggedIn;
