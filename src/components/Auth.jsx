import React from 'react'
import {auth, gProvider} from '../firebase-config'
import { signInWithPopup } from 'firebase/auth'

import Cookies from 'universal-cookie'

let cookies = new Cookies();

const Auth = (props) => {

  const { setIsAuth } = props;

  const SignInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, gProvider)
      console.log(result);
      cookies.set("auth-token", result.user.refreshToken)
      setIsAuth(true)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <p>Sign In with Google to Continue</p>
      <button onClick={SignInWithGoogle}>Sign in With Google</button>
    </div>
  )
}

export default Auth