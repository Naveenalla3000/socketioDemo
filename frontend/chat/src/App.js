import './App.css';
import io, { Socket } from 'socket.io-client';
import { useEffect, useState } from 'react';
import {nanoid} from 'nanoid';

const socket = io('http://localhost:8080');

function App() {
  const [message,setMessage ] = useState('');
  const [chat,setChat]= useState([]);

  const sendChat=(event)=>{
    event.preventDefault();
    socket.emit('chat', {message,id:nanoid()});
    setMessage('');
  }

  useEffect(() => {

      socket.on('chat',(data)=>{
        setChat([...chat,data]);
      })

  });
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Chat app</h1>
        <section>
          {chat.map((payload,index)=>
              <p key={index}>{payload.message}</p>
            )
          }
        </section>
        <section>
          <form onSubmit={sendChat}>
            <input 
              type="text" 
              placeholder='enter your message'
              name='chat'
              value={message}
              onChange={(e)=>setMessage(e.target.value)}
            />
            <button type='submit'>Send</button>
          </form>
        </section>
      </header>
    </div>
  );
}

export default App;
