import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App(){
  const pokedex = document.getElementById("pokedex");

  console.log(pokedex);

  const fetchPokemon = () => {

    const promises = [];
    for(let i = 1; i <= 151; i++){
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then((res) => res.json()));

  }

    Promise.all(promises).then((results) => {
      const pokemon = results.map((data) => ({
        name: data.name,
        id: data.id,
        image: data.sprites['front_default'],
        type: data.types.map((type) => type.type.name).join(', ')
      }));
      displayPokemon(pokemon);
    });
  };

  const displayPokemon = (pokemon) => {
    console.log(pokemon); 
    const pokemonHTMLString = pokemon.map ( pokemonn => `
    <li class="card">
      <img class="card-image" src="${pokemonn.image}" />
      <h2 class="card-title">${pokemonn.id + "."}</h2>
      <h2 class="card-title">${pokemonn.name}</h2>
      <p class="card-subtitle">Type: ${pokemonn.type}</p>
    </li>
    `
      )
      .join('');
    pokedex.innerHTML = pokemonHTMLString;
  }

  fetchPokemon();
}

export default App;
