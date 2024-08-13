const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const query = event.queryStringParameters.q;

  try {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${query}&key=${process.env.YOUTUBE_API_KEY}`);
    const data = await response.json();

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
