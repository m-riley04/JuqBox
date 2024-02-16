import LogoutButton from "../components/Auth0/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "../components/Auth0/Profile";

function Account() {
    const { isAuthenticated, error, isLoading } = useAuth0();
    const { loginWithPopup } = useAuth0();

    if (isLoading) return (
        <>
            <p>Loading...</p>
        </>
    );

    if (error) return (
        <>
            <h1>Error</h1>
            <p>There was an error logging you in: {error.message}</p>
        </>
    );

    if (!isAuthenticated) {
        loginWithPopup(); // Log in with a popup window (might be less accessible)
        //loginWithRedirect(); // Log in with a redirect (lose the app's states)

        return (
            <>
                <p>Waiting for login...</p>
            </>
        );
    }
    
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