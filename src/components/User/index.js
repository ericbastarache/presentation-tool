import React, { useState } from 'react'
import GoogleLogin from 'react-google-login'

const User = () => {
    const [isLoggedin, setIsLoggedin] = useState(false)

    const buttonText = !isLoggedin ? 'Login' : 'Logout';

    const handleResponse = (reponse) => {
        console.log(reponse)
    }

    return (
        <GoogleLogin 
            clientId="612923311848-gb7hs3mac93dqtecdpn0qq6fhnbvrl8d.apps.googleusercontent.com"
            buttonText={buttonText}
            onSuccess={handleResponse}
            onFailure={handleResponse}
            cookiePolicy='single_host_origin'
          />
    )
}

export default User