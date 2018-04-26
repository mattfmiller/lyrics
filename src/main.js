import { Lyrics } from './lyrics.js';
import { AnalyzeLyrics } from './analyzelyrics.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from 'jquery';

let displayData = function(inputArtist, inputSong, displayLyrics, analyze) {
  clearSearch();
  $("#lyrics").append(`<h2>${inputArtist} - ${inputSong}</h2>`);
  $("#lyrics").append("<h4>Lyrics:</h4><p>" + displayLyrics + "</p>");
  $("#analysis").append("Word Count: " + analyze.wordArray.length);
  $("#analysis").append(analyze.wordCountSet);
}

let displayError = function(error) {
  clearSearch();
  $("#errors").text(`${error}<br>There was an error processing your request: Please try again.`)
}

let clearSearch = function() {
  $("#lyrics").empty();
  $("#errors").empty();
  $("#analysis").empty();
}

$(document).ready(function() {
  $("#button").click(function(){
    let lyricsSearch = new Lyrics();
    let inputArtist = $("#artist").val().toUpperCase();
    let inputSong = $("#song").val().toUpperCase();
    lyricsSearch.apiCall(inputArtist, inputSong).then(function(response) {
      let result = JSON.parse(response);
      let displayLyrics = result.lyrics.toString().replace(/\r\n|\n|\r/g, '<br>');
      let analyze = new AnalyzeLyrics(result.lyrics);
      analyze.wordCount();
      displayData(inputArtist, inputSong, displayLyrics, analyze);
    }, function(error) {
      displayError(error);
    });
  });
});
