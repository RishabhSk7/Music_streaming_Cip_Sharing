// server.js (or wherever your Express server setup is)

const express = require('express');
const cors = require('cors');
const app = express();
const axios = require('axios');

app.use(cors());
app.use(express.json());
const PORT = 5000; // Port number for your Express server

async function getVideoIds(playlistId, apiKey) {
     try {
          const response = await axios.get('https://www.googleapis.com/youtube/v3/playlistItems', {
               params: {
                    part: 'snippet',
                    playlistId: playlistId,
                    key: apiKey,
                    maxResults: 50, // Adjust as needed
               }
          });

          const videoIds = response.data.items.map(item => item.snippet.resourceId.videoId);
          return videoIds;
     } catch (error) {
          console.error('Error fetching video IDs:', error);
          return [];
     }
}

// Usage example
// const playlistId = 'PL2ZWRJfziNYptCt8a0BlRUrwXTINBzSC9';
const apiKey = "your_api";    /* not uploading it to github */


// Define a route to handle GET requests for /api/data
app.post('/api/data', (req, res) => {
     // Extract necessary data from the request body
     
     // const { inputValue } = req.body;
     // // Check if required data is provided
     // if (!inputValue) {
     //      return res.status(400).json({ error: 'Missing required data' });
     // }

     // // Call getVideoIds function to fetch video ids
     // getVideoIds(inputValue, apiKey)
     //      .then(videoIds => {
     //           console.log(videoIds);
     //           res.json(videoIds);
     //      })
     //      .catch(error => {
     //           console.error('Error:', error);
     //           res.status(500).json({ error: 'Internal server error' });
     //      });
     res.json([
          'oRVMk_e18mc', 'sSnNRuQP4hY',
          'AZdxjmCfuYg', 'jmBx-gKrJfQ',
          'wie8AHZNuhQ', 'WRLYqPV9zE4',
          '2LZwzRsuFTQ', 'vNPwjl-TzQ0',
          'LJrA2QPtkLc', '45zJNqiANA4',
          'SpB909gfx78', 'ZLfhm71cDBg',
          'S_kPyDoOBw4', 'qD1tGesTr4E',
          'KRnN0NqJ0cg', '4gtPNfnHkqE',
          '8-e5lFlEouc', 'H2MS5Oj5YWE',
          'bIc7VfWnXSU', '-5qqrMu_AZc'
     ])
});

// Start the Express server
app.listen(PORT, () => {
     console.log(`Server is running on port ${PORT}`);
});
