// auction-api/server.js
require('dotenv').config(); // .envファイルを読み込む
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // CORSミドルウェア

const auctionRoutes = require('./routes/auctions'); // ルートをインポート

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// ミドルウェア
app.use(cors()); // CORSを許可
app.use(express.json()); // JSON形式のリクエストボディをパース

// MongoDBへの接続
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// ルートの設定
app.use('/api/auctions', auctionRoutes); // /api/auctions のパスでauctionRoutesを使用

// 基本的なルート
app.get('/', (req, res) => {
  res.send('Welcome to TradeMe Auction API Foundation!');
});

// サーバーの起動
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Access API at http://localhost:${PORT}/api/auctions`);
  console.log(`Access search API at http://localhost:${PORT}/api/auctions/search?keyword=your_keyword`);
});