import { APICalls } from './apiCall.js';
import { AnalyzeLyrics } from './analyzelyrics.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from 'jquery';

let displayData = function(inputSong, displayLyrics, analyze) {
  clearSearch();
  $("#lyrics").append(`<h2>${inputSong}</h2>`);
  $("#lyrics").append("<h4>Lyrics:</h4><p>" + displayLyrics + "</p>");
  $("#analysis").append("Word Count: " + analyze.totalWordCount);
  analyze.wordFrequency.forEach(function(element){
    $("#analysis").append("<br>" + element);
  });
}

let displayArtist = function(response) {
  $("#artistPic").empty();
  $("#artistInfo").empty();
  $("#artistPic").append(`<img src="${response.artists[0].strArtistThumb}">`);
  $("#artistPic").append(`<h1>${response.artists[0].strArtist}</h1>`)
  $("#artistPic").append(`<h2>Genre: ${response.artists[0].strGenre}</h2>`);
  $("#artistPic").append(`<h2>Year Formed: ${response.artists[0].intFormedYear}</h2>`);
  $("#artistInfo").append(`<blockquote class="blockquote"><h5>Biography:</h5><br> ${response.artists[0].strBiographyEN}</blockquote>`);
}

let displayErrorArtist = function(error) {
  $("#artistPic").empty();
  $("#artistInfo").empty();
  $("#errors").text(`There was an error processing your Artist request: Please try again.`)
}

let displayErrorLyrics = function(error) {
  clearSearch();
  $("#errors").text(`There was an error processing your lyrics request: Please try again.`)
}

let clearSearch = function() {
  $("#lyrics").empty();
  $("#errors").empty();
  $("#analysis").empty();
}

$(document).ready(function() {
  $("#button").click(function(){
    let search = new APICalls();
    let inputArtist = $("#artist").val().toUpperCase();
    let inputSong = $("#song").val().toUpperCase();

    //lyrics ES6 promise
    search.lyricsApiCall(inputArtist, inputSong).then(function(response) {
      let result = JSON.parse(response);
      let displayLyrics = result.lyrics.toString().replace(/\n\n|\r\n|\n|\r/g, '<br>');
      let analyze = new AnalyzeLyrics(result.lyrics);
      analyze.wordCount();
      displayData(inputSong, displayLyrics, analyze);
    }, function() {
      displayErrorLyrics();
    });

    //artist jQuery "promise"
    search.artistApiCall(inputArtist).then(function(response) {
      console.log(response);
      console.log(response.artists[0].strArtistThumb);
      displayArtist(response);
    }).fail(function(){
      displayErrorArtist();
    });
  });
});
