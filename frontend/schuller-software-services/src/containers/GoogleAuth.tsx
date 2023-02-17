import { useTheme } from "@mui/material";
import './GoogleAuth.css'

function GoogleAuth(props:any) {

    const theme = useTheme();

    return (
        <div className="GoogleAuth">
        <div id="g_id_onload"
             data-client_id="40668943377-4vb0kr2dds16iu6rs59jpak6hk2s2ga5.apps.googleusercontent.com"
             data-callback="handleCredentialResponse">
        </div>
        <div className="g_id_signin" data-type="standard"></div>
        </div>
    )

}

export default GoogleAuth;