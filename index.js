"use strict";

// let scrollTop = $(document).scrollTop();
// let windowHeight = $(window).height();
// let bodyHeight = $(document).height() - windowHeight;
// let scrollPercentage = scrollTop / bodyHeight;

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
function makeFetch(type, params = "", limit = 10) {
  $("#results-list").fadeOut("slow");
  let url = `https://api.pokemontcg.io/v1/${type}?${params}&limit=${limit}`;

  const options = {
    headers: new Headers({
      "Page-Size": 10,
      Count: 10
    })
  };
  console.log(url);

  fetch(url, options)
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
  console.log(val);
  makeFetch("cards", `name=${val}`);
  $("#pokemon_sets").val("startOption");
  $("#pokemon_types").val("startOption");
  $("#pokemon_subtypes").val("startOption");
});

$("#pokemon_sets").change(function() {
  const val = $("#pokemon_sets").val();
  console.log(val);
  makeFetch("cards", `set=${val}`);
  $("#pokemon_names").val("startOption");
  $("#pokemon_types").val("startOption");
  $("#pokemon_subtypes").val("startOption");
});

$("#pokemon_types").change(function() {
  const val = $("#pokemon_types").val();
  console.log(val);
  makeFetch("cards", `types=${val}`);
  $("#pokemon_names").val("startOption");
  $("#pokemon_sets").val("startOption");
  $("#pokemon_subtypes").val("startOption");
});

$("#pokemon_subtypes").change(function() {
  const val = $("#pokemon_subtypes").val();
  console.log(val);
  makeFetch("cards", `subtype=${val}`);
  $("#pokemon_names").val("startOption");
  $("#pokemon_sets").val("startOption");
  $("#pokemon_types").val("startOption");
});

function watchForm() {
  $("form").submit(e => {
    e.preventDefault();
    const val = $("#js-search-term").val();
    makeFetch("cards", `name=${val}`);
    $("#js-search-term").val("");
  });
}

// Main function
function main() {
  populateJson("./data/pokemon.json", "#pokemon_names");
  populateJson("./data/sets.json", "#pokemon_sets");
  populateJson("./data/types.json", "#pokemon_types");
  populateJson("./data/subtypes.json", "#pokemon_subtypes");

  makeFetch("cards");
  watchForm();
}

$(main());
