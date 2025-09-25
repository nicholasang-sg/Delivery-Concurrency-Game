import { useEffect, useRef } from 'react';

const WebSocketComponent = () => {
  const wsUri = "ws://127.0.0.1:9002/";
  const websocket = useRef(null);

  useEffect(() => {
    setTimeout(() => { // 1s delay gives WebSocket enough connection time 
        console.log("Opening WebSocket");
        websocket.current = new WebSocket(wsUri);

        websocket.current.addEventListener("open", () => {
            console.log("CONNECTED");
            setTimeout(() => {
                websocket.current.send("pingg");
            }, 1000)
        });

        websocket.current.addEventListener("close", () => {
            console.log("DISCONNECTED");
        });

        websocket.current.addEventListener("message", (e) => {
            console.log(`RECEIVED: ${e.data}`);
        });

        websocket.current.addEventListener("error", (e) => {
            console.error("ERROR:", e);
        });

        return () => {
            if(websocket.current) {
                websocket.current.close();
            }
        };
        
    }, 1000)
  }, []);

  return null; 
};

export default WebSocketComponent;