
# Sync & Snippet

Ever felt the need to vibe to a playlist with your friends? Or share a clip of epic gameplay in midst of a gaming session?
Worry not, Sync and Snippet is there for you!!


## Authors

- [@RishabhSk7](https://github.com/RishabhSk7)


## Tech Stack

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![AngularJS](https://img.shields.io/badge/AngularJS-E23237?style=for-the-badge&logo=angularjs&logoColor=white)
![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![ExpressJS](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

## Run Locally

Clone the project

```bash
  git clone https://github.com/RishabhSk7/Music_streaming_Cip_Sharing
```

Go to the project directory

```bash
  cd Music_streaming_Cip_Sharing
```

Install dependencies

```bash
  npm install
```

To start the Client:

```bash
  cd Client
  npm start
```

Do not close this terminal.

To start the server(assuming you're in client directory):
```
cd ..
cd server
npm start
```


## Server API References

#### Get IDs from youtube playlist

```http
  POST /api/data
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `playlist_URL` | `string` | **Required**. The playlist url |  

#### Upload a video to database

```http
  POST /upload
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `file`      | `video/*` | **Required**. A video media file. |

#### Get the angularJS page to show all videos

```http
  Get /showVideos
```

#### Get IDs of videos in database
```http
  POST /count
```

#### Get a video from database

```http
  POST /getVideo
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `String` | **Required**. ID of video to fetch from database. |

#### Get name of video file from  database
```http
  POST /getVideoTitle
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `String` | **Required**. ID of video to get name from database. |

## Screenshots

#### Home Screen without Playlist
![Home Screen without playlist](https://raw.githubusercontent.com/RishabhSk7/Music_streaming_Cip_Sharing/main/ScreenShots/Homepage_noplaylist.png)

#### Home Screen with Playlist
![Home Screen with playlist](https://raw.githubusercontent.com/RishabhSk7/Music_streaming_Cip_Sharing/main/ScreenShots/HomePage_withPLaylist.png)

#### Show all videos Page
![Show all videos page](https://raw.githubusercontent.com/RishabhSk7/Music_streaming_Cip_Sharing/main/ScreenShots/ShowAllVideosPage.png)

## Contributing

Please create an issue with feature request before Contributing to this project.