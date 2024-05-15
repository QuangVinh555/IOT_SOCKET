import React, { useState, useEffect } from 'react';
import * as signalR from '@microsoft/signalr';

const SignalRComponent = () => {
    const [connection, setConnection] = useState(null);
    const [infos, setInfos] = useState([{
        user: "",
        message: ""
    }]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl("https://localhost:5000/chathub") // Thay thế bằng URL của máy chủ SignalR
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, []);

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(() => {
                    console.log('Connected!');
                })
                .catch(error => {
                    console.log('Connection failed: ', error);
                });

            // Đăng ký hàm xử lý khi nhận được tin nhắn từ máy chủ
            connection.on("ReceiveMessage", (user, message) => {
                console.log(`${user} sent message: ${message}`);
                // Thực hiện các thao tác xử lý tin nhắn ở đây
                setInfos(pre=>[...pre, {user: user, message: message}]);
                console.log(infos)
            });
        }
    }, [connection]);

    
    // Hàm này được gọi khi người dùng gửi một tin nhắn
    const sendMessage = async (user, message) => {
        try {
            // Gửi tin nhắn tới Hub
            await connection.invoke("SendMessage", user, message);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div>
            <h2>WEB SOCKET</h2>
                {infos?.map(x => (
                <div key={x.user}>
                    <span>{x.user}  </span>
                    <span>{x.message}</span>
                </div>
                ))}
            <input type='text' onChange={(e) => setMessage(e.target.value)}/>
            <button onClick={() => sendMessage("User2", message)}>Send Message</button>
        </div>
    );
};

export default SignalRComponent;
