import { useContext } from "react";
import { SpotifyAPIContext, SpotifyAPIContextInterface } from "./SpotifyAPIContext"

export const useSpotifyAPI = (context = SpotifyAPIContext) =>
    useContext(context) as SpotifyAPIContextInterface;