import { AnalyzeLyrics } from "./analyzelyrics.js";

class Lyrics {

  apiCall(artist, song, displayData, displayError) {
    let promise = new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      // let error;
      let url =`https://api.lyrics.ovh/v1/${artist}/${song}`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          // error = new Error(request.statusText);
          reject();
        }
      }
      request.open("GET", url);
      request.send();
    });

    promise.then(function(response) {
      let result = JSON.parse(response);
      let analyze = new AnalyzeLyrics(result.lyrics);
      analyze.wordCount();
      displayData(artist, song, result, analyze);
    }, function() {
      displayError();
    });
  }
}

export { Lyrics };
