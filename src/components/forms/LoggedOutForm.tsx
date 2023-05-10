import Link from "next/link";

import styles from "./LoggedOutForm.module.scss";

const LoggedOut = () => {
  return (
    <main className={styles["user-info"]}>
      <div>Not logged in</div>
      <Link href="/login">
        <button className="styles.button">Login</button>
      </Link>
    </main>
  );
};
export default LoggedOut;
