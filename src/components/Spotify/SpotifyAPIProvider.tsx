import { ReactNode } from "react";
import { SpotifyAPIContext } from "./SpotifyAPIContext";
import { useLocation } from "react-router";

function SpotifyAPIProvider({ children } : { children:ReactNode}) {
    const location = useLocation();

    return (
        <SpotifyAPIContext.Provider value={location.state}>
            {children}
        </SpotifyAPIContext.Provider>
    )
}

export default SpotifyAPIProvider;