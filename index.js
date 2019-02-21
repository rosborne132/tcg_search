"use strict";

function populateJson(jsonData, location) {
  $.getJSON(jsonData, function(json) {
    json.map(data =>
      $(location).append(`<option value="${data}"> ${data}</option>`)
    );
  });
}

function makeFetch() {
  // console.log("make fetch");
  fetch("https://api.pokemontcg.io/v1/sets")
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error(res.statusText);
    })

    // Main issue
    .then(resJson => console.log(resJson))
    .catch(err => {
      $("#js-error-message").text(`Something went wrong: ${err.message}`);
    });
}

function main() {
  // makeFetch();
  populateJson("./data/pokemon.json", "#pokemon_names");
  populateJson("./data/sets.json", "#pokemon_sets");
  populateJson("./data/types.json", "#pokemon_types");
  populateJson("./data/subtypes.json", "#pokemon_subtypes");
}

$(main());

// Hardcoded url to buy pokemon cards
// https://shop.tcgplayer.com/pokemon/${SET_NAME}?ProductName=${CARD_NAME}
