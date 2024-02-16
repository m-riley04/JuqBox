import LogoutButton from "../components/Auth0/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "../components/Auth0/Profile";
import LoginButton from "../components/Auth0/LoginButton";

function Account() {
    const { isAuthenticated, error, isLoading } = useAuth0();

    if (isLoading) return (
        <>
            <p>Loading...</p>
        </>
    );

    if (error) return (
        <>
            <h1>Error</h1>
            <p>There was an error logging you in: {error.message}</p>
            <LoginButton></LoginButton>
        </>
    );

    if (!isAuthenticated) return (
        <>
            <LoginButton></LoginButton>
        </>
    );

    
    
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