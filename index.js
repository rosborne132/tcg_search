"use strict";

$.getJSON("pokemon.json", function(json) {
  const pokemon = json;
  console.log(pokemon);
});
