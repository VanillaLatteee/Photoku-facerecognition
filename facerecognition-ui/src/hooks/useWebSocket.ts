import { useEffect, useState } from 'react';

export const useWebSocket = (url: string) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    // Membuka koneksi WebSocket
    const ws = new WebSocket(url);
    setSocket(ws);

    ws.onopen = () => {
      console.log('WebSocket connected');
      setIsConnected(true);
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
      setIsConnected(false);
    };

    ws.onerror = (err) => {
      console.error('WebSocket error', err);
      setIsConnected(false);
    };

    ws.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [url]);

  // Fungsi untuk mengirim pesan
  const sendMessage = (message: object) => {
    if (socket && isConnected) {
      socket.send(JSON.stringify(message));
    } else {
      console.error('WebSocket is not connected.');
    }
  };

  return { messages, sendMessage, isConnected };
};
