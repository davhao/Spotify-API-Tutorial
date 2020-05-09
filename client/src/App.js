  
import React, { Component } from 'react';
import './App.css';

import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor(){
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: { name: 'Not Checked', artist: '', albumArt: '' },
      profilePic: 'https://scontent-iad3-1.xx.fbcdn.net/v/t1.0-1/c32.32.405.405a/s320x320/521734_429079457155526_949696252_n.jpg?_nc_cat=102&_nc_sid=0c64ff&_nc_ohc=YiY9U6VQnOYAX9ruJ4U&_nc_ht=scontent-iad3-1.xx&oh=567a6641c2be180d48edceb3c9ebf4da&oe=5ED9F6BF'
    }
  }
  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }

  getNowPlaying() {
    spotifyApi.getMyCurrentPlaybackState()
      .then((response) => {
        this.setState({
          nowPlaying: { 
              name: response.item.name,
              artist: response.item.artists[0].name, 
              albumArt: response.item.album.images[0].url
            }
        });
      })
  }

  // getAccountInfo() {
  //   spotifyApi.getMe()
  //   .then((response) => {
  //     this.setState({
  //       profilePic: response.images[0].url
  //     })
  //   })
  // }

  render() {
    return (
      <div className="App">
        <a href='http://localhost:8888' > 
          <button onClick={() => this.getAccountInfo()}>
            Login With Spotify
          </button> 
        </a>
        <div>
          <img src={this.state.profilePic} style={{ height: 50 }} alt={""}/>
        </div>
        <div>
          Now Playing: { this.state.nowPlaying.name } by { this.state.nowPlaying.artist }
        </div>
        <div>
          <img src={this.state.nowPlaying.albumArt} style={{ height: 300 }} alt={""}/>
        </div>
        <button onClick={() => this.getNowPlaying()}>
          Check Now Playing
        </button>
      </div>
    );
  }
}

export default App;