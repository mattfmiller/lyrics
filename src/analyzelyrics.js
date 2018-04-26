class AnalyzeLyrics {

  constructor(apiResponse) {
    this.apiResponse = apiResponse.toString().toLowerCase().replace(/[\r|\n|\r\n|\r\n\n]/g, " ").replace(/[^a-z0-9 ]/g, "").replace(/ +/g, " ");
    console.log(this.apiResponse);
    this.wordArray = this.apiResponse.split(" ");
    this.wordFrequency = [];
  }


  wordCount() {
    console.log(this.wordArray);
    for (var i = 0; i < this.wordArray.length; i++) {
      // debugger;
      let regEx = new RegExp(this.wordArray[i] +"\\b", "gi");
      // console.log(regEx);
      let words = this.apiResponse.match(regEx);
      // console.log(words);
      let count = words.length;
      this.wordFrequency.push([count, this.wordArray[i]]);
      console.log(this.wordFrequency);
      console.log(this.wordArray);
      console.log(count);
      for (var j = this.wordArray.length ; j > i ; j--) {
        if (this.wordArray[j] === this.wordArray[i]) {
          // debugger;
          console.log([j]);
          // console.log(this.wordArray[i]);
          this.wordArray.splice([j], 1)
        }
      }
    }

  //   this.wordArray.forEach((element) => {
  //     let regEx = new RegExp(" " + element + " ", "gi");
  //     let words = this.apiResponse.match(regEx);
  //     let count = words.length
  //     this.wordCountSet.add([count, element]);
  //   });
  //   console.log(this.wordFrequency);
  }

}

export { AnalyzeLyrics };
