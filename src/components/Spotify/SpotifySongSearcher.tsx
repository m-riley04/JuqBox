import { ChangeEvent, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Track, getTracks } from "../../server/spotifyRequests";
import { getServerAccessToken } from "../../server/spotifyAuthorization";

function SpotifySongSearcher() {
    const [token, setToken] = useState("");

    const [tracks, setTracks] = useState<Track[]>();
    const [query, setQuery] = useState<string>("");

    function handleQueryChanged(event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        
        setQuery(event.target.value);
    }

    return (
        <>
            
        </>
    );
}