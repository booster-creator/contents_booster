// 필요한 라이브러리 설치
// npm install express axios dotenv

const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = 3000;

// 정적 파일을 제공하기 위해 public 디렉토리를 설정
app.use(express.static('public'));


// 유튜브 API 키를 환경 변수로 설정 (환경 변수 파일에서 불러옴)
const API_KEY = process.env.YOUTUBE_API_KEY;

// 백엔드 서버에서 유튜브 API 호출
app.get('/search', async (req, res) => {
    try {
        const query = req.query.q;
        const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
                part: 'snippet',
                q: query,
                type: 'video',
                maxResults: 10,
                key: API_KEY
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'API 호출 실패' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
