/**
 * Represents the a user's profile information stoted in JSON
 * @prop {string} country
 * @prop {string} display_name
 * @prop {string} email
 * @prop {JSON} explicit_content a JSON object containing "filter_enabled" and "filter_locked" boolean properties
 * @prop {JSON} external_urls a JSON object containing a "spotify" string property 
 * @prop {JSON} followers JSON object containing "href" string property and "total" number property
 * @prop {string} href
 * @prop {string} id
 * @prop {Image[]} images
 * @prop {string} product
 * @prop {string} type
 * @prop {string} uri
 */
export interface UserProfile {
    country: string;
    display_name: string;
    email: string;
    explicit_content: {
        filter_enabled: boolean,
        filter_locked: boolean
    },
    external_urls: { spotify: string; };
    followers: { href: string; total: number; };
    href: string;
    id: string;
    images: Image[];
    product: string;
    type: string;
    uri: string;
}

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

function generateRandomString(length: number) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

/**
 * @param codeVerifier
 * @returns {string} a code challenge for the authorization PCKE
 */
async function generateCodeChallenge(codeVerifier: string) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

/**
 * Redirects the page to the Spotify authorization page (login/accept screen)
 * @param {string} clientId the Spotify API app client id 
 * @param {string} scope a string of the Spotify API scopes to request access to. Each is separated by spaces.
 */
export async function redirectToAuthCodeFlow(clientId: string, scope:string) {
    const verifier = generateRandomString(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", window.location.origin + "/auth/callback");
    params.append("scope", scope);
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}


/**
 * @param clientId the Spotify API app client id 
 * @param codeChallenge the code challenge for PCKE
 * @returns {Promise<string>} a promise that contains a user's access token
 */
export async function getAccessToken(clientId: string, code: string): Promise<string> {
    const verifier = localStorage.getItem("verifier");

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", window.location.origin + "/auth/callback");
    params.append("code_verifier", verifier!);

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    });

    const { access_token } = await result.json();
    return access_token;
}

/**
 * 
 * @param token an access token from the Spotify API
 * @returns {Promise<JSON>} a promise containing a user's profile data
 */
export async function fetchProfile(token: string): Promise<JSON> {
    const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    return await result.json();
}