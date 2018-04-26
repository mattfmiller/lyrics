class AnalyzeLyrics {

  // Takes lyric API call results, Regex replaces returns in JSON object with a single space, Regex removes non alphanumeric and space characters, splits this result into an array of words
  constructor(apiResponse) {
    this.apiResponse = apiResponse.toString().toLowerCase().replace(/[\r|\n|\r\n|\r\n\n]/g, " ").replace(/[^a-z0-9 ]/g, "").replace(/ +/g, " ");
    this.wordArray = this.apiResponse.split(" ");
    this.wordFrequency = [];
    this.totalWordCount = this.wordArray.slice().length;
  }

  // First for loop creates Regex search for a given word, runs a Regex match of this word on the array, counts and pushes word into a new array, removes all but first instance of the word from the original array starting from the last position
  wordCount() {
    for (var i = 0; i < this.wordArray.length; i++) {
      let regEx = new RegExp(this.wordArray[i] +"\\b", "gi");
      let words = this.apiResponse.match(regEx);
      let count = words.length;
      this.wordFrequency.push([count, this.wordArray[i]]);
      for (var j = this.wordArray.length ; j > i ; j--) {
        if (this.wordArray[j] === this.wordArray[i]) {
          this.wordArray.splice([j], 1)
        }
      }
    }

    //wordCountSort is a comparison function that gets passed to .sort() as an argument. This will compare count values for each [count, word] element in wordFrequency.
    function wordCountSort(a, b) {
      if (a[0] < b[0]) {
        return -1;
      } else if (a[0] > b[0]) {
        return 1;
      } else {
        return 0;
      }
    }

    this.wordFrequency.sort(wordCountSort).reverse();
  }

}

export { AnalyzeLyrics };
