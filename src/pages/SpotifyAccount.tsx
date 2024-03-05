import { useEffect } from "react";
import { fetchProfile, getAccessToken, redirectToAuthCodeFlow } from "../server/spotifyRequests";

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;

function SpotifyAccount() {

    useEffect(() => {

        async function handleAuthorization() {
            const params = new URLSearchParams(window.location.search);
            const code_recieved = params.get("code");

            if (!code_recieved) {
                redirectToAuthCodeFlow(CLIENT_ID, "streaming user-read-currently-playing");
            } else {
                const accessToken = await getAccessToken(CLIENT_ID, code_recieved);
                const profile = await fetchProfile(accessToken);
                console.log(profile);
                //populateUI(profile);
            }
        }

        handleAuthorization();
        
    }, []);

    return (
        <>
            <p>Authorizing spotify...</p>
        </>
    );
}

export default SpotifyAccount;