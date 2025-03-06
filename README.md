# BitFlyer リアルタイム価格表示アプリケーション

このアプリケーションは、BitFlyer Lightning APIを使用してビットコイン（BTC/JPY）の価格情報をリアルタイムで表示するWebアプリケーションです。

## 機能

- BTC/JPYの現在価格のリアルタイム表示
- 価格変動のビジュアルインジケーター（上昇/下落）
- 最良買い気配値（Best Bid）と数量
- 最良売り気配値（Best Ask）と数量
- 24時間取引量
- 取引所ステータス
- タイムスタンプ

## 必要条件

- Node.js (v14.0.0以上)
- npm (v6.0.0以上)

## インストール方法

1. リポジトリをクローン、もしくはダウンロードします：

```bash
git clone [リポジトリURL]
cd websocket_practice
```

2. 必要なパッケージをインストールします：

```bash
npm install
```

## 使用方法

1. アプリケーションを起動します：

```bash
npm start
```

2. ブラウザで以下のURLにアクセスします：

```
http://localhost:3000
```

## 技術仕様

- **フロントエンド**: HTML, CSS, JavaScript (Vanilla)
- **バックエンド**: Node.js, Express
- **WebSocket**: ws (WebSocket client and server for Node.js)
- **データソース**: BitFlyer Lightning WebSocket API

## プロジェクト構造

```
websocket_practice/
├── README.md
├── package.json
├── index.js              # WebSocketサーバー
└── public/
    └── index.html        # フロントエンドUI
```

## APIリファレンス

このアプリケーションは[BitFlyer Lightning API](https://lightning.bitflyer.com/docs?lang=ja)を使用しています。
具体的には以下のチャンネルを購読しています：

- `lightning_ticker_BTC_JPY`: BTC/JPYの価格情報

## 注意事項

- このアプリケーションは情報表示のみを目的としており、取引機能は含まれていません。
- WebSocket接続が切断された場合は、ページを再読み込みしてください。
- 取引所のメンテナンス時は接続できない場合があります。

## ライセンス

MIT

## 作者

[あなたの名前]

## 貢献方法

1. このリポジトリをフォーク
2. 新しいブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 今後の改善予定

- [ ] 価格チャートの追加
- [ ] 価格アラート機能
- [ ] 複数の通貨ペアの表示
- [ ] 取引履歴の表示
- [ ] モバイル向けUIの最適化 