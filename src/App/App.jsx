import { useState } from 'react';
import useWebSocket from 'react-use-websocket';
import ContentRenderer from '../ContentRenderer/ContentRenderer';
import './App.css';

const WS_URL = "ws://localhost:5000";

export default function App () {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useWebSocket(WS_URL, {
    onOpen: () => {
    console.log('WebSocket connection established.');
    },
    onMessage:(message)=>{
      if(message){
        setData(JSON.parse(message?.data) || []);
        setIsLoading(false);
      } 
    }
  });

  return (
    <div className='content'>
      <h1>Reuters News</h1>
      {
        isLoading ? <h3>Loading...</h3> : <ContentRenderer data={data}/>
      }
      
    </div>
  );
};


