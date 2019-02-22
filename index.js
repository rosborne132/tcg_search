"use strict";

function populateJson(jsonData, location) {
  $.getJSON(jsonData, function(json) {
    json.map(data =>
      $(location).append(`<option value="${data}"> ${data}</option>`)
    );
  });
}

function displayCard(card) {
  console.log(card);
}

function displayCards(resData) {
  resData.cards.map(card => displayCard(card));
}

function makeFetch(type, params = "") {
  let url = `https://api.pokemontcg.io/v1/${type}?${params}`;
  console.log(url);

  fetch(url)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error(res.statusText);
    })
    .then(resJson => displayCards(resJson))
    .catch(err => {
      $("#js-error-message").text(`Something went wrong: ${err.message}`);
    });
}

$("#pokemon_names").change(function() {
  const val = $("#pokemon_names").val();
  console.log(val);
  makeFetch("cards", `name=${val}`);
});

$("#pokemon_sets").change(function() {
  const val = $("#pokemon_sets").val();
  console.log(val);
  makeFetch("cards", `set=${val}`);
});

$("#pokemon_types").change(function() {
  const val = $("#pokemon_types").val();
  console.log(val);
  makeFetch("cards", `types=${val}`);
});

$("#pokemon_subtypes").change(function() {
  const val = $("#pokemon_subtypes").val();
  console.log(val);
  makeFetch("cards", `subtype=${val}`);
});

function main() {
  // makeFetch("sets");
  populateJson("./data/pokemon.json", "#pokemon_names");
  populateJson("./data/sets.json", "#pokemon_sets");
  populateJson("./data/types.json", "#pokemon_types");
  populateJson("./data/subtypes.json", "#pokemon_subtypes");
}

$(main());

// Hardcoded url to buy pokemon cards
// https://shop.tcgplayer.com/pokemon/${SET_NAME}?ProductName=${CARD_NAME}

// My api calls
// Sets: cards?set=Base
// Types: cards?types=water
// Subtypes: cards?subtype=mega
// Pokemon: cards?name=pikachu
