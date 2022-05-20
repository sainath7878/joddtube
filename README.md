<div align="center">

# JODDTube

</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-joddtube">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
      <a href="#features">Features</a>
      <ul>
        <li><a href="#video-listing-page">Video Listing Page</a></li>
        <li><a href="#single-video-page">Single Video Page</a></li>
        <li><a href="#likes-page">Likes Page</a></li>
        <li><a href="#watch-later-page">Watch Later Page</a></li>
        <li><a href="#history-page">History Page</a></li>
        <li><a href="#playlist-page">PlayList Page</a></li>
        <li><a href="#individual-playlist-page">Individual Playlist Page</a></li>
        <li><a href="#authentication">Authentication</a></li>
      </ul>
    </li>
  </ol>
</details>

---

## About Joddtube

JODDTube is a video library application where you can like videos, add videos to watch later, create your playlist and has history to keep a track of your recently watched videos. JODDTube is publicly hosted on vercel at [https://joddtube.vercel.app/](https://joddtube.vercel.app/)

The website is built using following tech-stack:

<ul>
    <li>ReactJS</li>
    <li>React Router v6</li>
    <li>useContext + useReducer for state management</li>
    <li>Jodd UI and Vanilla CSS</li>
    <li>MockBee for mock Backend</li>
</ul>

---

## Getting Started

---

### Installation

Clone the repository on your local machine by typing the below commands on your terminal and cd to `joddkart`.

```
git clone https://github.com/sainath7878/joddkeep.git
cd joddkeep
```

Install the necessary dependencies.

```
npm install
```

`joddtube` uses `mockbee's` mockbackend.
Create an environment variable inside .env file in the root of the project with the below code.

```
REACT_APP_JWT_SECRET = <JWT_SECRET_KEY_OF_YOUR_CHOICE>
```

Now to run the app write the following command in your terminal:

`npm start`
This should run the app on localhost:3000.

```
npm start
```

---

## Features

---

### Video Listing Page

- This contains list of videos and filters to filter videos based on available categories

### Single Video Page

- User can watch video from this page.
- Like the Video.
- Unlike the video if it's already liked.
- Add Video to Watch Later.
- Remove from Watch Later if it's already added to Watch Later
- Add the video to playlist.

### Likes Page

- This page will contain all the liked videos by the user.
- User can unlike videos from exisiting liked videos/

### History Page

- This page will contain all the recently watched videos.
- User can remove a video from history.
- User can clear entire history.

### Watch Later Page

- This page will contain all the videos added to watch later by the user.
- User can remove videos from exisiting watch later videos.

### Playlist Page

- This page will contain all the playlists created by the user.
- User can delete the entire playlist.
- User can navigate to a particular playlist to see the videos added to that particular playlist.

### Individual Playlist Page

- This page will contain all the videos added to the playlist user navigates from.
- User can remove a video from the playlist.

### Authentication

- User can do a guest login
- User can Log In/Log Out with existing credentials
- User can sign up by if they are new to website
- User can logout from navbar

## SOCIALS

---

<a href="https://twitter.com/sainath_svm"><img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white"/></a>
<a href="https://www.linkedin.com/in/svm-sainath-90aa061aa/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"/></a>

</ul>
