/**
 * @property {string} url
 * @property {number} height
 * @property {number} width
 */
export interface Image {
    url: string;
    height: number;
    width: number;
}

export interface Artist {
    external_urls: object;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
}

export interface Album {
    album_type: string;
    artists: Artist[];
    available_markets: Array<string>;
    external_urls: object;
    href: string;
    id: string;
    images: Image[];
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
}

export interface Track {
    album: Album;
    artists: Array<Artist>;
    available_markets: Array<string>;
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: object;
    external_urls: object;
    href: string;
    id: string;
    is_local: boolean;
    name: string;
    popularity: number;
    preview_url: string | undefined;
    track_number: number;
    type: string;
    uri: string;
}

export function getTracks(name:string, token:string) : Promise<Track[]> {
    return fetch(`https://api.spotify.com/v1/search?q=remaster%2520track%3A${name}&type=track`, { method: "GET", headers: {Authorization: `Bearer ${token}`}})
        .then(response => {
            if (!response.ok) {
                throw new Error("Track query response was not okay")
            }
            return response.json()
        })
        .then(data => {
            return data.tracks.items
        });
}