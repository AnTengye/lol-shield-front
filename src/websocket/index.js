import { useStore } from "vuex";

const wsUrl = 'ws://localhost:9365/ws';
var socket = null;
var lockReconnect = false;
var pingInterval = null;

export const sendRequest = (req) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ op: 2, method: req }));
    } else {
        console.log('WebSocket 连接未打开');
    }
};

const sendPing = (socket, message) => {
    if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(message));
    } else {
        console.log('WebSocket ping失败');
        socket.close();
        clearInterval(pingInterval);
    }
};

export const connectSocket = () => {
    socket = new WebSocket(wsUrl);
    const store = useStore();
    socket.onmessage = function (msg) {
        console.log("onmessage", msg);
        store.commit('ws/setWsRes', JSON.parse(msg.data ?? '{}'));
    };
    socket.onopen = function () { //連線(onopen)
        /*
     * 连接成功
     * */
        console.log('通讯开始');
        // 发送心跳防止ws协议自动断联
        pingInterval = setInterval(() => {
            sendPing(socket, { op: 1 });
        }, 1000 * 1);
    };
    socket.onerror = function (err) {
        // 2S重连一次
        if (!lockReconnect) {
            lockReconnect = true;
            setTimeout(function () {
                connectSocket();
                lockReconnect = false;
            }, 2000);
        }
    };
    socket.close = function () {
        // 2S重连一次
        if (!lockReconnect) {
            lockReconnect = true;
            setTimeout(function () {
                connectSocket();
                lockReconnect = false;
            }, 2000);
        }
    }
};
