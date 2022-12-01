import { Button } from '@mui/material';
import { Link } from "react-router-dom";
import { generateCodeChallenge, generateCodeVerifier } from '../../pkce/pkce';

const LoginButton = () => {
    const verifier = generateCodeVerifier();
    sessionStorage.setItem('codeVerifier', verifier);
    const codeChallenge = generateCodeChallenge();
    sessionStorage.setItem('codeChallenge', codeChallenge);
    console.log("code-verifier: " + verifier)
    console.log("code-challenge: " + codeChallenge)

    return (
        <>
            <Button variant="contained" disableElevation component={Link} to="/redirect">Anmelden</Button>  
        </>
    )
}

export default LoginButton