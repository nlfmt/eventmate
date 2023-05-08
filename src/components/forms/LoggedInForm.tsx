import { useSession } from "next-auth/react";


const LoggedIn = () => {
    const { data: sessionData } = useSession();

    return (
        <>
            <div>
                User: {sessionData?.user.name}
                EMail: {sessionData?.user.email}
            </div>
        </>
    );
};

export default LoggedIn;