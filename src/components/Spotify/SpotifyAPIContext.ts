import { createContext } from "react";

export interface SpotifyAPIContextInterface {
    token: string
    user: object
    client_id: string
}

export const initialContext : SpotifyAPIContextInterface = {
    token: "",
    user: {},
    client_id: ""
}

export const SpotifyAPIContext = createContext<SpotifyAPIContextInterface>(initialContext);