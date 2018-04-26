class Lyrics {

  apiCall(artist, song) {
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
}

export { Lyrics };
