import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "./app.css";



var y = '<img src=';
var x = ' width="500">';

var request = new XMLHttpRequest();

request.open('GET', 'https://api.nasa.gov/planetary/apod?api_key=SSPfwc2usOuSol0GOVAFt35B4VxA3jEXSZ0BuY0j&count=1', true);
request.onload = function () {

  // Begin accessing JSON data here
  var data[] = JSON.parse(this.response);

  if (request.status >= 200 && request.status < 400) {

    data.forEach(copyright => {
document.getElementById("date").innerHTML = (copyright.date);
document.getElementById("tit").innerHTML =(copyright.title);
document.getElementById("exp").innerHTML =(copyright.explanation);
document.getElementById("pic").innerHTML = y + (copyright.url) + x ;
document.getElementById("options").innerHTML = "<button>"+(copyright.title) +"</button><button>"+ (copyright.title) +"</button><button>"+ (copyright.title) + "</button>";
          console.log(copyright.date)
    }
  );
  } else {
    console.log('error');
  }
}
request.send();








const Testi = () => {
  return(
<div><h1>Quess the Title</h1> <h3>Quess the title from a space themed picture from Nasa</h3></div>
);
};

ReactDOM.render(
  <Testi />
, document.getElementById("wrapper"));
