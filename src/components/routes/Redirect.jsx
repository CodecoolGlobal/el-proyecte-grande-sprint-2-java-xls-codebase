import { useSearchParams, useNavigate } from "react-router-dom";
import { Buffer } from "buffer";
import { generateCodeChallenge, generateCodeVerifier } from '../../pkce/pkce';
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { OAUTH2_AUTHORIZATION_ENDPOINT } from "../../config/constants.js";
import { OAUTH2_CLIENT_ID } from "../../config/constants";
import { OAUTH2_CODE_CHALLENGE_METHOD } from "../../config/constants";
import { OAUTH2_RESPONSE_TYPE } from "../../config/constants";
import { OAUTH2_TOKEN_ENDPOINT } from "../../config/constants";
import { OAUTH2_REDIRECT_URI } from "../../config/constants";
import { OAUTH2_GRANT_TYPE } from "../../config/constants";
import { OAUTH2_SCOPE } from "../../config/constants";
import { OAUTH2_CLIENT_SECRET } from "../../config/constants";

const Redirect = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    if (sessionStorage.getItem('codeVerifier') === null) {
        const codeVerifier = generateCodeVerifier();
        const codeChallenge = generateCodeChallenge(codeVerifier);
    
        sessionStorage.setItem('codeVerifier', codeVerifier);
        sessionStorage.setItem('codeChallenge', codeChallenge);
    }

    const codeVerifier = sessionStorage.getItem('codeVerifier');
    const codeChallenge = sessionStorage.getItem('codeChallenge');

    const clearCodeChallenge = () => sessionStorage.removeItem('codeChallenge');
    const clearCodeVerifier = () => sessionStorage.removeItem('codeVerifier');

    const code = searchParams.get('code') ? searchParams.get('code') : undefined;

    const getAuthorizationCode = (codeChallenge) => {
        const link = OAUTH2_AUTHORIZATION_ENDPOINT 
        + '?'
        + 'response_type=' + OAUTH2_RESPONSE_TYPE
        + '&client_id=' + OAUTH2_CLIENT_ID 
        + '&scope=' + OAUTH2_SCOPE
        + '&redirect_uri=' + OAUTH2_REDIRECT_URI 
        + '&code_challenge=' + codeChallenge 
        + '&code_challenge_method=' + OAUTH2_CODE_CHALLENGE_METHOD;

        window.location.href = link;
    }
    
    const requestIdToken = async (code, codeVerifier) => {
        const link = OAUTH2_TOKEN_ENDPOINT
            + '?'
            + 'client_id=' + OAUTH2_CLIENT_ID
            + '&grant_type=' + OAUTH2_GRANT_TYPE 
            + '&code_verifier=' + codeVerifier
            + '&code=' + code
            + '&redirect_uri=' + OAUTH2_REDIRECT_URI;

        const headers = {
            'Content-Type': 'x-www-form-urlencoded',
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Basic ${Buffer.from(`${OAUTH2_CLIENT_ID}:${OAUTH2_CLIENT_SECRET}`).toString('base64')}`
        }
        
        const result = await axios.post(link, null, {headers: headers});
        return result.data;
    }

    if (code === undefined) {
        getAuthorizationCode(codeChallenge);
    }

    const { isSuccess, isError, data, error } = useQuery({
        queryKey: ['getIdToken', code, codeVerifier], 
        queryFn: () => requestIdToken(code, codeVerifier),
        enabled: !!code && !!codeVerifier
    })

    if (isError) {
        console.log(`Authorization failed: ${error}`);
        navigate('/')
    }

    if (isSuccess) {
        sessionStorage.setItem('accessToken', data.access_token)
        sessionStorage.setItem('idToken', data.id_token)
        sessionStorage.setItem('user', JSON.parse(Buffer.from(data.id_token.split('.')[1], 'base64').toString()).sub);
        clearCodeChallenge();
        clearCodeVerifier();
        navigate('/')
    }    
    return <p>Redirecting ...</p>
}

export default Redirect;