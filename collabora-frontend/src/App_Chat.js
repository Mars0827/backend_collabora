import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { useState } from 'react';
import './App.css';
import WaitingRoom from './components/waitingroom';
import ChatRoom from './components/ChatRoom';

function App() {
  const[conn, setConnection] = useState(null);
  const [messages, setMessages] = useState([]);

  const joinChatRoom = async (username, chatroom) => {
    try {
      const conn = new HubConnectionBuilder()
              .withUrl('http://localhost:5141/chat')
              .configureLogging(LogLevel.Information)
              .build();
      conn.on("JoinSpecificChatRoom", (username, msg) => {
        console.log("msg: ", msg); // Debug message
        setMessages((prevMessages) => [...prevMessages, { username, msg }]);
      });

      conn.on("ReceiveSpecificMessage", (username, msg) => {
        setMessages(messages => [...messages, {username,msg}]);
      })
      

      await conn.start();
      await conn.invoke("JoinSpecificChatRoom", {username, chatroom});

      setConnection(conn)
    } catch(e){
      console.log(e);
    }
  }

  const sendMessage = async(message) => {
    try {
      await conn.invoke("SendMessage", message);
      
    } catch (e){
      console.log(e);
    }
  }

  return (
    <div>
      <main>
        <div>
          <h1>Welcome chat app nigga</h1>
        </div>
        {!conn ? 
          <WaitingRoom joinChatRoom={joinChatRoom}></WaitingRoom>
          : <ChatRoom messages={messages} sendMessage={sendMessage}></ChatRoom>
        }
      </main>
    </div>
  );
}

export default App;
