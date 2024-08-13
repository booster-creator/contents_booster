const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const query = event.queryStringParameters.q;

  try {
    const searchResponse = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${query}&key=${process.env.YOUTUBE_API_KEY}`);
    const searchData = await searchResponse.json();

    const videoIds = searchData.items.map(item => item.id.videoId).join(',');

    const videoResponse = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoIds}&key=${process.env.YOUTUBE_API_KEY}`);
    const videoData = await videoResponse.json();

    return {
      statusCode: 200,
      body: JSON.stringify(videoData.items),
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch data' }),
    };
  }
};
