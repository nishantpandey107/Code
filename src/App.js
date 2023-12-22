import { useEffect } from "react";
import {base64UrlDecode} from './util.js'

function App() {

    // function base64UrlDecode(str) {
    //     let output = str.replace(/-/g, "+").replace(/_/g, "/");
    //     switch (output.length % 4) {
    //         case 0:
    //             break;
    //         case 2:
    //             output += "==";
    //             break;
    //         case 3:
    //             output += "=";
    //             break;
    //         default:
    //             throw new Error("base64 string is not of the correct length");
    //     }
    //     try {
    //         return b64DecodeUnicode(output);
    //     }
    //     catch (err) {
    //         return atob(output);
    //     }
    // }

    // function b64DecodeUnicode(str) {
    //     return decodeURIComponent(atob(str).replace(/(.)/g, (m, p) => {
    //         let code = p.charCodeAt(0).toString(16).toUpperCase();
    //         if (code.length < 2) {
    //             code = "0" + code;
    //         }
    //         return "%" + code;
    //     }));
    // }

    function handleCallBackResponse(resonse){
        const part = resonse.credential.split(".")[1];
        var user =  JSON.parse(base64UrlDecode(part));
        console.log(user)
    }
    useEffect(() => {
        google.accounts.id.initialize({
            client_id: '71759417408-glcohpo62mo1ucmjh0qrrrkut50jhkdm.apps.googleusercontent.com',
            callback: handleCallBackResponse
        })
    }, [])
    google.accounts.id.renderButton(
        document.getElementById('signInDiv'),
        {theme: 'outline', size: 'large'}
    )
    google.accounts.id.prompt();// also display the One Tap dialog
    return (
        <div>
            <div>NISNT</div>            
            <div id='signInDiv'></div>
        </div>
    );
}
export default App;