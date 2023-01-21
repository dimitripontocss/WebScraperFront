import { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import './App.css';

import dataFormater from '../utils/dataFormater';

const WS_URL = "ws://localhost:5000";

export default function App () {
  const [data, setData] = useState([]);
 

  useWebSocket(WS_URL, {
    onOpen: () => {
      console.log('WebSocket connection established.');
    }
  });

  const { lastMessage } = useWebSocket(WS_URL, {
    share: true
  });

  useEffect(()=>{
    if(lastMessage) setData(JSON.parse(lastMessage?.data) || []);
  },[lastMessage]);
  

  return (
    <div className='content'>
      <h1>Reuters News</h1>
      <div>
        {
          data.map((n)=> <RenderNews news={n} key={n.id}/>)
        }
      </div>
    </div>
  );
};

function RenderNews({news}){
  const actualDate = new Date(Date.now()).toISOString().split(',')[0].slice(0,10);
  const { spTime, date } = dataFormater(news.date)
  return (
    <div>
      <h4>
        {
        actualDate === date ? spTime+" " : date+" "
        }
        - RTS - <a href={news.url} target="_blank">{news.title}</a></h4>
    </div>
  )
}
