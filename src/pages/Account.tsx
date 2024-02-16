import LogoutButton from "../components/Auth0/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "../components/Auth0/Profile";


function Account() {
    const { isAuthenticated } = useAuth0();

    if (isAuthenticated) return (
        <>
            <Profile></Profile>
            <LogoutButton></LogoutButton>
        </>
    );

    return (
        <>
            <p>Waiting for login...</p>
        </>
    );
}

export default Account;