const express = require('express');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const port = 3000;

// 静的ファイルの提供
app.use(express.static('public'));

// HTTPサーバーの起動
const server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// WebSocketサーバーの設定
const wss = new WebSocket.Server({ server });

// クライアントとの接続を管理
wss.on('connection', function connection(ws) {
    console.log('New client connected');

    // bitFlyerのWebSocketに接続
    const bitflyerWs = new WebSocket('wss://ws.lightstream.bitflyer.com/json-rpc');

    bitflyerWs.on('open', function open() {
        // チャンネル登録
        const subscribeMessage = {
            method: "subscribe",
            params: {
                channel: "lightning_ticker_BTC_JPY"
            },
            id: 1
        };
        bitflyerWs.send(JSON.stringify(subscribeMessage));
    });

    bitflyerWs.on('message', function incoming(data) {
        // bitFlyerからのデータをクライアントに転送
        ws.send(data.toString());
    });

    ws.on('close', function close() {
        console.log('Client disconnected');
        bitflyerWs.close();
    });
}); 