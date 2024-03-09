import { Track } from "../../../server/spotifyRequests";

interface SpotifyTrackItemProps extends React.HTMLProps<HTMLDivElement> {
    track?: Track;
  }

const SpotifyTrackItem : React.FC<SpotifyTrackItemProps>  = ({track, ...props}) =>{

    return (
        <div {...props}>
            <img src={track?.album.images[0].url} style={{width: "75px"}}/>
            <p>{track?.name} - {track?.artists.map((artist) => artist.name + ", ")}</p>
        </div>
    );
}

export default SpotifyTrackItem;