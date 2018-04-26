import $ from 'jquery';

class APICalls {

  lyricsApiCall(artist, song) {
    let promise = new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url =`https://api.lyrics.ovh/v1/${artist}/${song}`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url);
      request.send();
    });
    return promise;
  }

  artistApiCall(artist) {
    return $.get(`http://www.theaudiodb.com/api/v1/json/1/search.php?s=${artist}`)
  }
}

export { APICalls };
