import React, { useEffect, useState } from 'react'

import { addDoc, collection, onSnapshot, query, serverTimestamp, where } from 'firebase/firestore'
import { auth, db } from '../firebase-config'

const Chat = (props) => {
  const { room } = props
  const [newMessage, setNewMessage] = useState('')

  const messageRef = collection(db, 'messages')


  useEffect(() => {
    const queryMessages = query(messageRef, where('where' + '==' + room))
    onSnapshot(queryMessages, (snapshot) => {
      let messages = []
      snapshot.forEach((doc) => {
        messages.push({...doc.data(), id: doc.id})
      })
    })
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage === '') return;

    await addDoc(messageRef, {
      text: newMessage,
      craetedAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room
    });
    setNewMessage('')
  }

  return (
    <div>
      <form action="" onSubmit={(e) => handleSubmit(e)}>
        <input 
          type="text"
          placeholder='type your message here...' 
          onChange={e => setNewMessage(e.target.value)}
          value={newMessage} />
        <button type="submit">send</button>
      </form>
    </div>
  )
}

export default Chat