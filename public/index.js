import React from 'react';
import {Component} from 'react';
import ReactDOM from 'react-dom';

// rakenne on siis sellainen, että avatessa sovellus lataa kokonaisuuden,
// ja kun käyttäjä antaa vastauksensa, haku-funktio lähtee alusta rullaamaan.
// toiminnallisuus siis uusiHaku -funktion sisällä!

// pisteiden lasku ulkona funktiosta, ettei nollaannu joka kierroksella
var pisteet = 0;
// apin onkiminen
const uusiHaku = () => {
  var request = new XMLHttpRequest();

  // haetaan api, joka on Nasan avoimesta rajapinnasta avaruusaiheisia kuvia sekä niiden tietoja
  request.open('GET', 'https://api.nasa.gov/planetary/apod?api_key=SSPfwc2usOuSol0GOVAFt35B4VxA3jEXSZ0BuY0j&count=3', true);
  request.onload = function() {

    // API käsittely, eli parsitaan vastaus ja tallennetaan data-muuttujaan
    var data = JSON.parse(this.response);

    // random numero että vastaukset ei tulostu aina samassa järjestyksessä
    var rand = data[Math.floor(Math.random() * data.length)];
    // logataan konsoliin oikea vastaus, jotta kehittäessä on helpompaa
    console.log("Oikea vastaus: " + rand.title)

    // Tulostaa kuvan rand.url:ista, eli apin kohdasta, joka antaa kuvan url-osoitteen
    // image -tagi on divin sisällä.
    function Kuva(props) {
      return <div>
        <img src={rand.url} alt="" onError={(e) => {
            e.target.onerror = null;
            e.target.src = "stolen_image.jpg"
          }}/>
      </div>;
    }

    // render -toiminto kuvan tulostamiseksi html-sivun pic -diviin.
    ReactDOM.render(<Kuva/>, document.getElementById('pic'));

    // pisteiden lasku, oikea vastaus on pisteet +1, ja väärästä ei muutu
    const Pistelasku = () => {
      return (<h2>Score: {pisteet}</h2>);
    }

    // tarkastaa onko kelvollinen yhteys meille tänään täällä
    if (request.status >= 200 && request.status < 400) {

      class Tarkastus extends React.Component {
        constructor(props) {
          super(props);
          this.handleClick = this.handleClick.bind(this);
        }
        // tarkastaa, mitä nappia painettu, ja palauttaa sen value -arvon
        handleClick({currentTarget}) {

          var vastaus = currentTarget.value;

          // jos oikea vastaus on sama kuin käyttäjän vastaus, pisteet +1 ja uusi haku
          if (rand.title === data[vastaus].title) {
            // pisteet lähetetään omaan paikkaansa html-sivulle
            console.log("OIKEIN", pisteet++)
            // tulostaa pisteet
            ReactDOM.render(<Pistelasku/>, document.getElementById('pisteet'));
            uusiHaku();

            //  jos vastaus on muu kuin oikea, ei pisteitä ja uusi haku
          } else {
            console.log("VÄÄRIN")
            var request = new XMLHttpRequest();
            uusiHaku();
          }

          // jos on mediatype video, uusi haku ja konsoliin kirjaus
          if (rand.media_type === "video") {
            uusiHaku();
            console.log("video ohitettu");
          }

          // jos otsikkoa ei ole määritelty, uusi haku.
          if (rand.title === undefined) {
            uusiHaku();
          }
        }
            // tulostaa napit ja antaa niille id & value -arvot käyttöä varten
        render() {
          return (<div>
            <br></br>
            <button id="0" value="0" onClick={this.handleClick}>{data[0].title}</button>
            <button id="1" value="1" onClick={this.handleClick}>{data[1].title}</button>
            <button id="2" value="2" onClick={this.handleClick}>{data[2].title}</button>
          </div>);
        }

      }
      // tulostaa napit napit-diviin
      ReactDOM.render(<Tarkastus/>, document.getElementById('napit'));

    // jos yhteys ei toimi niin erroria konsoliin
    } else {
      console.log('error');
    }
  }

  request.send();
}
uusiHaku();
