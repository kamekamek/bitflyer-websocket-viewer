# 🌐 WebSocketの仕組みと実用例

## 📚 WebSocketとは

WebSocketは、クライアントとサーバー間で双方向のリアルタイム通信を可能にするプロトコルです。
従来のHTTP通信と異なり、一度接続を確立すると、クライアントとサーバーの両方が自由にデータを送受信できます。

## 🔄 HTTPとWebSocketの違い

```mermaid
sequenceDiagram
    participant Client as クライアント
    participant Server as サーバー
    
    rect rgba(200, 220, 240, 0.5)
        note right of Client: HTTPリクエスト/レスポンス
        Client->>+Server: HTTPリクエスト
        Server-->>-Client: HTTPレスポンス
        note over Client,Server: 毎回の通信で新しい接続を確立する必要がある
    end
    
    rect rgba(220, 240, 220, 0.5)
        note right of Client: WebSocket通信
        Client->>+Server: WebSocket接続要求
        Server-->>-Client: 接続確立（ハンドシェイク完了）
        note over Client,Server: 永続的な双方向通信チャネルが確立
        Client->>Server: リアルタイムデータ送信
        Server->>Client: リアルタイムデータ送信
        Client->>Server: リアルタイムデータ送信
        Server->>Client: リアルタイムデータ送信
    end
```

### 主な特徴

1. **双方向通信**：クライアントとサーバーの両方が自由にデータを送信可能
2. **リアルタイム性**：低レイテンシーでのデータ転送が可能
3. **効率性**：HTTPと比較してオーバーヘッドが少ない
4. **永続的接続**：一度確立した接続を維持

## 💡 一般的なユースケース

1. **リアルタイム価格情報**
   - 株価・仮想通貨の価格表示
   - 為替レートの更新

2. **チャットアプリケーション**
   - メッセージのリアルタイム送受信
   - オンラインステータスの更新

3. **オンラインゲーム**
   - プレイヤー間のリアルタイム通信
   - ゲーム状態の同期

4. **IoTデバイスモニタリング**
   - センサーデータのリアルタイム監視
   - デバイスステータスの更新

## 🔍 実装例：BitFlyer価格表示システム

### システムアーキテクチャ

```mermaid
flowchart TB
    %% サブグラフのスタイル定義
    subgraph Browser[" クライアントブラウザ "]
        direction TB
        WSClient["WebSocketクライアント<br><small>価格データの受信処理</small>"]
        UI["価格表示UI<br><small>リアルタイム更新</small>"]
    end

    subgraph Server[" Expressサーバー "]
        direction TB
        WSServer["WebSocketサーバー<br><small>データ中継処理</small>"]
        Static["静的ファイル配信<br><small>HTML/CSS/JS</small>"]
    end

    subgraph BitFlyer[" BitFlyer API "]
        direction TB
        BitFlyerWS["BitFlyer WebSocket<br><small>価格情報配信</small>"]
    end

    %% 接続の定義
    WSClient <--> |"WebSocket通信<br>(ws://)"| WSServer
    UI --- |"データバインド"| WSClient
    WSServer <--> |"WebSocket通信<br>(wss://)"| BitFlyerWS
    Static --> |"初期リソース配信"| UI

    %% スタイル定義
    classDef default fill:#fff,stroke:#333,stroke-width:2px;
    classDef browser fill:#e8f4f8,stroke:#0066cc,stroke-width:3px;
    classDef server fill:#f0f7eb,stroke:#339933,stroke-width:3px;
    classDef api fill:#fff3e6,stroke:#ff6600,stroke-width:3px;
    classDef component fill:#fff,stroke:#666,stroke-width:2px;

    %% クラスの適用
    class Browser,WSClient,UI browser;
    class Server,WSServer,Static server;
    class BitFlyer,BitFlyerWS api;
```

### データフロー

```mermaid
sequenceDiagram
    participant Browser as ブラウザ<br>クライアント
    participant Server as Express<br>サーバー
    participant BitFlyer as BitFlyer<br>WebSocket API

    rect rgba(230, 240, 255, 0.5)
        note right of Browser: 初期接続フェーズ
        Browser->>+Server: WebSocket接続要求
        Server->>+BitFlyer: WebSocket接続確立
        Server->>BitFlyer: BTC/JPY価格チャンネル登録
        BitFlyer-->>-Server: 登録完了
        Server-->>-Browser: 接続確立完了
    end
    
    rect rgba(240, 255, 240, 0.5)
        note right of Browser: リアルタイム更新フェーズ
        loop 価格更新ストリーム
            BitFlyer->>Server: BTC/JPY価格データ送信
            Server->>Browser: 価格データ転送
            activate Browser
            Browser->>Browser: UI更新処理
            deactivate Browser
        end
    end
    
    rect rgba(255, 240, 240, 0.5)
        note right of Browser: 終了フェーズ
        Browser->>Server: 接続切断要求
        Server->>BitFlyer: 接続切断
        BitFlyer-->>Server: 切断完了
        Server-->>Browser: 切断完了通知
    end
```

### 実装の主要コンポーネント

1. **サーバーサイド実装（Node.js + Express + ws）**
```javascript
// WebSocketサーバーの設定
const wss = new WebSocket.Server({ server });

// クライアント接続時の処理
wss.on('connection', function connection(ws) {
    // BitFlyerのWebSocket接続
    const bitflyerWs = new WebSocket('wss://ws.lightstream.bitflyer.com/json-rpc');
    
    // データ受信時の転送処理
    bitflyerWs.on('message', function incoming(data) {
        ws.send(data.toString());
    });
});
```

2. **クライアントサイド実装（JavaScript）**
```javascript
const ws = new WebSocket(`ws://${window.location.hostname}:3000`);

ws.onmessage = function(event) {
    const data = JSON.parse(event.data);
    if (data.params && data.params.message) {
        const ticker = data.params.message;
        // 価格表示の更新
        document.getElementById('price').textContent = 
            new Intl.NumberFormat('ja-JP').format(ticker.ltp) + ' 円';
    }
};
```

## 📝 まとめ

WebSocketは、リアルタイムデータ更新が必要なアプリケーションに最適なプロトコルです。
本実装例では、以下の利点を活用しています：

1. **リアルタイム性**: 価格情報をミリ秒単位で更新
2. **効率性**: 必要な時だけデータを転送
3. **スケーラビリティ**: 多数のクライアントに対応可能
4. **信頼性**: 接続断時の自動再接続機能

WebSocketを活用することで、従来のポーリング方式と比較して、より効率的でリアルタイムな通信が実現可能となります。