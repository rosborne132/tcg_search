"use strict";
// Populate dropdown menu with given json data
function populateJson(jsonData, location) {
  $.getJSON(jsonData, function(json) {
    let itemHTML = [];
    json.map(data => itemHTML.push(`<option value="${data}">${data}</option>`));
    $(location).append(itemHTML);
  });
}

// Display cards to card list
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
        }/${card.name}" id="card-button" class="button">BUY</a>
      </li>
      `
    )
  );

  $("#results-list").append(cardList);
  $("#results-list").fadeIn("slow");
}

// Make fetch request based on search term
function makeFetch(params = "") {
  $("#results-list").fadeOut("slow");
  let url = `https://api.pokemontcg.io/v1/cards?${params}`;

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

// Populate Dropdown menus
$("#pokemon_names").change(function() {
  const val = $("#pokemon_names").val();
  makeFetch(`name=${val}`);
  $("#pokemon_sets").val("startOption");
  $("#pokemon_types").val("startOption");
  $("#pokemon_subtypes").val("startOption");
});

$("#pokemon_sets").change(function() {
  const val = $("#pokemon_sets").val();
  makeFetch(`set=${val}`);
  $("#pokemon_names").val("startOption");
  $("#pokemon_types").val("startOption");
  $("#pokemon_subtypes").val("startOption");
});

$("#pokemon_types").change(function() {
  const val = $("#pokemon_types").val();
  makeFetch(`types=${val}`);
  $("#pokemon_names").val("startOption");
  $("#pokemon_sets").val("startOption");
  $("#pokemon_subtypes").val("startOption");
});

$("#pokemon_subtypes").change(function() {
  const val = $("#pokemon_subtypes").val();
  makeFetch(`subtype=${val}`);
  $("#pokemon_names").val("startOption");
  $("#pokemon_sets").val("startOption");
  $("#pokemon_types").val("startOption");
});

function watchForm() {
  $("form").submit(e => {
    e.preventDefault();
    const val = $("#js-search-term").val();
    makeFetch(`name=${val}`);
    $("#js-search-term").val("");
  });
}

// Main function
function main() {
  populateJson("./data/pokemon.json", "#pokemon_names");
  populateJson("./data/sets.json", "#pokemon_sets");
  populateJson("./data/types.json", "#pokemon_types");
  populateJson("./data/subtypes.json", "#pokemon_subtypes");

  makeFetch();
  watchForm();
}

$(main());
