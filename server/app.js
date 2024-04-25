// server.js (or wherever your Express server setup is)

// mongod --dbpath "C:\Users\2002t\Documents\mongoDB-data\data" --logpath "C:\Users\2002t\Documents\mongoDB-data\log\mongod.log"

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require("dotenv");
const fs = require("fs");
const { ObjectId } = require('mongodb');
const {MongoClient} = require('mongodb');
const { GridFSBucket } = require('mongodb');
// const File = require('@web-std/file');
// const mongoose = require("mongoose");         /* dont use mongoose, see gfs declaration at end */
const multer = require('multer'); /* required for handling the files */
const { GridFsStorage } = require('multer-gridfs-storage');

const app = express();
dotenv.config();

const PORT = process.env.PORT;
const MONGOURL = process.env.MONGOURL;          //ps use 127.0.0.1 instead of localhost

const storage = new GridFsStorage({url:"mongodb://127.0.0.1:27017/WebtechProject", 
file: (req, file) => {
     return {filename: file.originalname}
}});
const upload = multer({ storage });

app.use(cors());
app.use(express.json());

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
const apiKey = "Enter_Your_API_KEY";    /* not uploading it to github */

// Define a route to handle GET requests for /api/data
app.post('/api/data', (req, res) => {
     const { inputValue } = req.body;
     // Check if required data is provided
     if (!inputValue) {
          return res.status(400).json({ error: 'Missing required data' });
     }

     // Call getVideoIds function to fetch video ids
     getVideoIds(inputValue, apiKey)
          .then(videoIds => {
               console.log(videoIds);
               res.json(videoIds);
          })
          .catch(error => {
               console.error('Error:', error);
               res.status(500).json({ error: 'Internal server error' });
          });
     // res.json([
     //      'w4TNGhSj2tc', 'cYPJaHT5f3E',
     //      'CMNyHBx1gak', 'mmKguZohAck',
     //      '1YBtzAAChU8', 'EeRfSNx5RhE',
     //      '0MiR7bC9B5o', 'g6LhK0wTemE',
     //      'Z-_TTyZUOLk', '1bvbsx-hpFc',
     //      'ldDtjQkLsss', 'TlWYgGyNnJo',
     //      'i43tkaTXtwI', 'O7RG-B6N1Vw',
     //      '-R0UYHS8A_A', 'Nyx6SBixRE8',
     //      '1fueZCTYkpA', 'l98w9OSKVNA',
     //      'n61ULEU7CO0', 'gnZImHvA0ME',
     //      'TURbeWK2wwg', '_tV5LEBDs7w',
     //      'BTYAsjAVa3I', 'zFhfksjf_mY',
     //      'wAPCSnAhhC8', 'lTRiuFIWV54'
     // ]);
});

app.post('/upload', upload.single('file'), (req, res) => {
     console.log("HERE");
     if (!req.file) {
          return res.status(400).json({ message: 'No file uploaded' });
     };

});

app.get("/showVideos", function (req, res) {
     res.send(fs.readFileSync("C:\\Users\\2002t\\Documents\\project\\gaming-music-solution\\Client\\showvideos.html", "utf-8", (err, data) => {
          if (err) {
               console.log(err);
               return;
          }
          return data;
     }));
})

app.get('/count', async (req, res) => {
     try {
          console.log("HEHE");
          const collection = storage.db.collection('fs.files');
          const documents = await collection.find({}, { _id: 1 }).toArray();
          const ids = documents.map(doc => doc._id);
          res.json({ ids });
     } catch (error) {
          console.error('Error:', error);
          res.status(500).json({ error: 'Internal Server Error' });
     }
});

MongoClient.connect(MONGOURL, { useNewUrlParser: true, useUnifiedTopology: true })
     .then(client => {
          console.log('Connected to MongoDB');
          const db = client.db();
          const collection = db.collection('fs.files'); // Collection for file metadata

          // Define GridFSBucket for file operations
          const bucket = new GridFSBucket(db, { bucketName: 'fs' });

          // Route handler to get video
          app.post('/getVideo', async (req, res) => {
               try {
                    const videoId = req.body.id;
                    const objectId = ObjectId.createFromHexString(videoId);

                    // Retrieve the file metadata from the fs.files collection
                    const file = await collection.findOne({ _id: objectId });

                    if (!file) {
                         return res.status(404).json({ success: false, message: 'File not found' });
                    }

                    // Open a download stream for the file from the GridFSBucket
                    const downloadStream = bucket.openDownloadStream(objectId);

                    // Set the Content-Type header based on the file's contentType
                    res.set('Content-Type', file.contentType);

                    // Stream the file data to the response
                    downloadStream.pipe(res);
               } catch (error) {
                    console.error('Error:', error);
                    res.status(500).json({ success: false, error: 'Internal Server Error' });
               }
          });

          app.post('/getVideoTitle', async (req, res) => {
               try {
                    const videoId = req.body.id;
                    const objectId = ObjectId.createFromHexString(videoId);

                    // Retrieve the file metadata from the fs.files collection
                    const file = await collection.findOne({ _id: objectId });

                    if (!file) {
                         return res.status(404).json({ success: false, message: 'File not found' });
                    }

                    // Open a download stream for the file from the GridFSBucket
                    res.send(file.filename);
               } catch (error) {
                    console.error('Error:', error);
                    res.status(500).json({ success: false, error: 'Internal Server Error' });
               }
          });

          // Start server or define other routes here
     })
     .catch(error => {
          console.error('Error connecting to MongoDB:', error);
     });

let gfs;  //we need gfs to be reassginable, but accessible globally, can also use var
// connect to db and Start the Express server

/* NOTE DO NOT USE THIS WITH GFS, IT DOESNT RETURN AN "OBJECT" */
// mongoose.connect(MONGOURL).then((conn) => {
//      app.listen(PORT, () => {
//           console.log(`Server is running on port ${PORT}`);
//      });
// }).catch((error) => {
//      console.log(error);
// })

app.listen(PORT, () => {
     console.log(`Server is running on port ${PORT}`);
});
