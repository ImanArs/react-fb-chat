import React, { useRef, useState } from 'react'
import Auth from './components/Auth'


import Cookies from 'universal-cookie'
import Chat from './components/Chat';

let cookies = new Cookies();

const App = () => {
  
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"))
  const [room,setRoom] = useState(null)

  const roomInputRef = useRef(null)

  if (!isAuth) {
    return (
      <div>
        <Auth setIsAuth={setIsAuth}/>
      </div>
    )
  }
  return (
    <div>
      {
       room ? (
        <Chat room={room} />
       ) : (
        <div>
          <label htmlFor="">Enter room name :</label>
          <input type="text" name="" id="" ref={roomInputRef} />
          <button onClick={() => setRoom(roomInputRef.current.value)}>enter chat</button>
        </div> 
       )
      }
    </div>
  )
}

export default App