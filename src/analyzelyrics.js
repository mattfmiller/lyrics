class AnalyzeLyrics {

  constructor(apiResponse) {
    this.apiResponse = apiResponse.toString().replace(/[\r\n]/g, " ").replace(/[()]/g, "");
    this.wordArray = this.apiResponse.split(" ");
    this.wordCountSet = new Set;
  }

  wordCount() {
    this.wordArray.forEach((element) => {
      let regEx = "/" + element + "/gi";
      console.log(regEx);
      let word = this.apiResponse.match(/Yeah/gi);
      // console.log(word);
      let count = word.length
      // console.log(count);
      this.wordCountSet.add(element + ": " + count);
    });
  }

}

export { AnalyzeLyrics };
