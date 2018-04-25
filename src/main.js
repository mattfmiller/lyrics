import { Lyrics } from './lyrics.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from 'jquery';

let displayData = function(inputArtist, inputSong, response, analyze) {
  $("#lyrics").empty()&&$("#errors").empty();
  $("#lyrics").append(`${inputArtist} - ${inputSong}<br>`);
  $("#lyrics").append("Lyrics: " + response.lyrics + "<br>");
  $("#lyrics").append("Word Count: " + analyze.wordArray.length);
  $("#lyrics").append(analyze.wordCountSet);
  console.log(analyze.wordCountSet);
}

let displayError = function() {
  $("#lyrics").empty();
  $("#errors").text(`There was an error processing your request: No lyrics found. Please try again.`)
}

$(document).ready(function() {
  $("#button").click(function(){
    let lyrics = new Lyrics();
    let inputArtist = $("#artist").val();
    let inputSong = $("#song").val();
    lyrics.apiCall(inputArtist, inputSong, displayData, displayError);
  });
});
