"use strict";

function populateJson(jsonData, location) {
  $.getJSON(jsonData, function(json) {
    let itemHTML = [];
    json.map(data => itemHTML.push(`<option value="${data}">${data}</option>`));
    // console.log(itemHTML);
    $(location).append(itemHTML);
  });
}

// Hardcoded url to buy pokemon cards
// https://shop.tcgplayer.com/pokemon/${SET_NAME}?ProductName=${CARD_NAME}

function displayCards(resData) {
  $("#results-list").empty();
  const { cards: cards } = resData;
  let cardList = [];
  cards.map(card =>
    cardList.push(
      `
      <li class="card">
        <img src="${card.imageUrl}" alt="${card.name}"/>
        <a target="_blank" href="https://shop.tcgplayer.com/pokemon/${
          card.set
        }/${card.name}" id="card-button" type="submit">BUY</a>
      </li>
      `
    )
  );

  $("#results-list").append(cardList);
  $("#results").removeClass("hidden");
}

function makeFetch(type, params = "") {
  let url = `https://api.pokemontcg.io/v1/${type}?${params}&limit=50`;
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

function watchForm() {
  $("form").submit(e => {
    e.preventDefault();
    const val = $("#js-search-term").val();
    makeFetch("cards", `name=${val}`);
  });
}

function main() {
  makeFetch("cards");
  populateJson("./data/pokemon.json", "#pokemon_names");
  populateJson("./data/sets.json", "#pokemon_sets");
  populateJson("./data/types.json", "#pokemon_types");
  populateJson("./data/subtypes.json", "#pokemon_subtypes");
  watchForm();
}

$(main());
