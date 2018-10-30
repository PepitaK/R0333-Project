import React from 'react';
import {Component} from 'react';
import ReactDOM from 'react-dom';
import "./app.css";

// pisteiden lasku ulkona funktiosta, ettei nollaannu joka kierroksella
var pisteet = 0;
// apin onkiminen
function uusiHaku(){
var request = new XMLHttpRequest();

request.open('GET', 'https://api.nasa.gov/planetary/apod?api_key=SSPfwc2usOuSol0GOVAFt35B4VxA3jEXSZ0BuY0j&count=3', true);
request.onload = function() {

// API käsittely
  var data = JSON.parse(this.response);

// random numero että vastaukset ei oo aina samassa järjestyksessä
  var rand = data[Math.floor(Math.random() * data.length)];

  console.log("Oikea vastaus: " + rand.title)

// Tulostaa kuvan

  function Kuva(props) {
    return <div>
      <img src={rand.url} width="500"></img>
    </div>;
  }

  ReactDOM.render(<Kuva/>, document.getElementById('pic'));

  const Testi = () => {
    return (<h2>Score: {pisteet}</h2>);
  }

  // tarkastaa vastaukset
  if (request.status >= 200 && request.status < 400) {

    class Tarkastus extends React.Component {
      constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
      }
      // tarkastaa, mitä nappia painettu
      handleClick({currentTarget}) {
        var vastaus = currentTarget.value;
        //  console.log(rand.title + data[vastaus].title)

        if (rand.title === data[vastaus].title) {
          // jos vastaus on oikein, scoreen tulee +1 ja se päivittyy wrapperiin
          console.log("OIKEIN", pisteet++)
          ReactDOM.render(<Testi/>, document.getElementById('pisteet'));
          uusiHaku();
          //  uusien juttujen haku

        } else {
          console.log("VÄÄRIN")
          var request = new XMLHttpRequest();
          uusiHaku();
        } // e.currentTarget.value would be equivalent
      }
      // tulostaa napit ja antaa niille id & value käyttöä varten
      render() {
        return (<div> <br></br>
          <button id="0" value="0" onClick={this.handleClick}>{data[0].title}</button>
          <button id="1" value="1" onClick={this.handleClick}>{data[1].title}</button>
          <button id="2" value="2" onClick={this.handleClick}>{data[2].title}</button>
        </div>);
      }



    }
    // tulostaa napit napit-diviin
    ReactDOM.render(<Tarkastus/>, document.getElementById('napit'));

  } else {
    console.log('error');
  }
}

request.send();
}
uusiHaku();
