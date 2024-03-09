import { redirectToAuthCodeFlow } from "../../server/spotifyAuthorization";

function SpotifyAuthRedirectButton() {

    return (
        <button onClick={() => {
            //redirectToAuthCodeFlow(import.meta.env.VITE_SPOTIFY_CLIENT_ID, )
        }}>
            Authorize with Spotify
        </button>
    )
}

export default SpotifyAuthRedirectButton;