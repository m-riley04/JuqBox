import { redirectToAuthCodeFlow } from "../../server/spotifyRequests";

function SpotifyAuthorizeButton() {
    return (
        <>
        <button onClick={() => {
            redirectToAuthCodeFlow(import.meta.env.VITE_SPOTIFY_CLIENT_ID, "streaming user-read-currently-playing")
        }}>
            Authorize with Spotify
        </button>
        </>
    );
}

export default SpotifyAuthorizeButton;