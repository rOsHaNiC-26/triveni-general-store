import { useEffect, useState, useRef } from 'react';
import * as signalR from '@microsoft/signalr';

interface SignalRProps {
  orderId: string;
  token: string | null;
}

export function useSignalR({ orderId, token }: SignalRProps) {
  const [connectionState, setConnectionState] = useState<string>('Disconnected');
  const [riderLocation, setRiderLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [orderStatus, setOrderStatus] = useState<string>('Processing');
  const [notifications, setNotifications] = useState<string[]>([]);
  
  const connectionRef = useRef<signalR.HubConnection | null>(null);

  useEffect(() => {
    if (!token || !orderId) return;

    const connect = async () => {
      const connection = new signalR.HubConnectionBuilder()
        .withUrl(`http://localhost:5000/triveniHub?access_token=${token}`)
        .withAutomaticReconnect([0, 2000, 5000, 10000, 30000]) // Robust reconnection logic
        .configureLogging(signalR.LogLevel.Information)
        .build();

      connectionRef.current = connection;

      // Event Listeners
      connection.on('ReceiveLocationUpdate', (lat: number, lng: number) => {
        setRiderLocation({ lat, lng });
      });

      connection.on('ReceiveStatusUpdate', (status: string) => {
        setOrderStatus(status);
      });

      connection.on('Notification', (message: string) => {
        setNotifications((prev) => [message, ...prev]);
      });

      // Lifecycle Handlers
      connection.onreconnecting(() => setConnectionState('Reconnecting'));
      connection.onreconnected(() => {
        setConnectionState('Connected');
        // Re-join group after reconnect
        connection.invoke('JoinOrderGroup', orderId);
      });
      connection.onclose(() => setConnectionState('Disconnected'));

      try {
        await connection.start();
        setConnectionState('Connected');
        await connection.invoke('JoinOrderGroup', orderId);
      } catch (err) {
        console.error('SignalR Connection Error: ', err);
        setConnectionState('Failed');
      }
    };

    connect();

    return () => {
      if (connectionRef.current) {
        connectionRef.current.invoke('LeaveOrderGroup', orderId).catch(console.error);
        connectionRef.current.stop();
      }
    };
  }, [orderId, token]);

  return { connectionState, riderLocation, orderStatus, notifications };
}
