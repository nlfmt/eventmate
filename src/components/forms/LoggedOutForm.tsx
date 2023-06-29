import Link from "next/link";
import c from "./LoggedOutForm.module.scss";

const LoggedOut = () => {
  return (
    <>
      <main className={c.main}>
        <div className={c.container}>
          <div className={c.text}>You are not logged in</div>
          <div>
            <Link href="/login">
              <button className={c.button}>Login</button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default LoggedOut;
