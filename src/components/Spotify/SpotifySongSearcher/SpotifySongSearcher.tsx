import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Track, getTracks } from "../../../server/spotifyRequests";
import { getServerAccessToken } from "../../../server/spotifyAuthorization";
import SpotifyTrackItem from "./SpotifyTrackItem";
import "./SpotifySongSearcher.scss";

function SpotifySongSearcher() {
    const [token, setToken] = useState("");

    const [tracks, setTracks] = useState<Track[]>();
    const [query, setQuery] = useState<string>("");

    function handleQueryChanged(event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        
        setQuery(event.target.value);
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        handleQuery();
    }

    function handleClickedTrack(index: number) {
        console.log(`Clicked track #${index}`)
        console.log(tracks[index]);
    }

    function handleQuery() {
        if (!token) { console.warn("No access token provided."); return; }
        getTracks(query, token).then((data) => {
            setTracks(data);
            console.log(data);
        })
    }

    useEffect(() => {
        getServerAccessToken(import.meta.env.VITE_SPOTIFY_CLIENT_ID, import.meta.env.VITE_SPOTIFY_SECRET)
            .then((data) => {
                setToken(data);
            })
    }, [])

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Control onChange={handleQueryChanged}></Form.Control>
                </Form.Group>

                <Button onClick={handleQuery}>Search</Button>
            </Form>

            {tracks?.map((track, i) => <SpotifyTrackItem className="track" onClick={() => handleClickedTrack(i)} track={track} key={i} index={i}></SpotifyTrackItem>)}
            
        </>
    );
}

export default SpotifySongSearcher;