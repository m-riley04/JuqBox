import LogoutButton from "../components/Auth0/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";


function Account() {
    const { isAuthenticated } = useAuth0();

    if (isAuthenticated) return (
        <>
            <LogoutButton></LogoutButton>
        </>
    );

    return (
        <>
        </>
    );
}

export default Account;