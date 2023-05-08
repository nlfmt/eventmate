import Link from "next/link";

const LoggedOut = () => {
    return (
        <>
            <div>not logged in</div>
            <Link href="/login" >Login</Link>
        </>
    );
};
export default LoggedOut;