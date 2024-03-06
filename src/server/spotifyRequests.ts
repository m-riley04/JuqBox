export function getTracks(name:string, token:string) {
    return fetch(`https://api.spotify.com/v1/search?q=remaster%2520track%3A${name}&type=track`, { headers: {Authorization: `Bearer ${token}`}})
        .then(response => {
            if (!response.ok) {
                throw new Error("Track query response was not okay")
            }
            return response.json()
        })
        .then(data => {
            return data.tracks
        });
}