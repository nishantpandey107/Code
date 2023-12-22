import { useEffect, useState } from "react";
import {base64UrlDecode} from './util.js'

function App() {

    const [user, setUser] = useState({})

    function handleSignOut(event){
        setUser({})
        document.getElementById('signInDiv').hidden = false
    }

    function handleCallBackResponse(resonse){
        const part = resonse.credential.split(".")[1];
        var userObj =  JSON.parse(base64UrlDecode(part));
        document.getElementById('signInDiv').hidden = true
        setUser(userObj)
        console.log(userObj)
    }
    useEffect(() => {
        google.accounts.id.initialize({
            client_id: '71759417408-glcohpo62mo1ucmjh0qrrrkut50jhkdm.apps.googleusercontent.com',
            callback: handleCallBackResponse
        })
    }, []);

    google.accounts.id.renderButton(
        document.getElementById('signInDiv'),
        {theme: 'filled_black', size: 'large', shape: 'pill'}
    )
    //google.accounts.id.prompt();// also display the One Tap dialog
    //Sub is the main id
    return (
        <div>
            <div>Tst911</div>
            <div id='signInDiv'></div>
            { Object.keys(user).length != 0 &&
                <button onClick={ (e) => handleSignOut(e)}>Sign Out</button>
            }
            { user && 
                <div>
                    <img src = {user.picture}></img>
                    <h3>{user.given_name} {user.family_name}</h3>
                </div>
            }
        </div>
    );
}
export default App;