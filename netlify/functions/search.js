const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const query = event.queryStringParameters.q;

  try {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${process.env.YOUTUBE_API_KEY}`);
    const data = await response.json();

    // 데이터가 올바르게 반환되는지 로그로 확인
    console.log('Fetched Data:', data);

    return {
      statusCode: 200,
      body: JSON.stringify(data.items), // 필요한 데이터만 반환
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch data' }),
    };
  }
};
