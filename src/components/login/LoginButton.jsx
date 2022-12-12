import { Button } from '@mui/material';
import { Link } from "react-router-dom";

const LoginButton = () => {
    return (
        <>
            <Button variant="contained" disableElevation component={Link} to="/redirect">Anmelden</Button>  
        </>
    )
}

export default LoginButton