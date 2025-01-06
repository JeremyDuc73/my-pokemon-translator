<template>
  <div id="app">
    <h1>Pokémon & Attack Translator</h1>

    <h2>Pokémon Table</h2>
    <SearchBar v-model="pokemonSearch" placeholder="Search Pokémon..." />
    <PokemonTable :searchQuery="pokemonSearch" />

    <h2>Attack Table</h2>
    <SearchBar v-model="attackSearch" placeholder="Search Attacks..." />
    <AttackTable :searchQuery="attackSearch" />
  </div>
</template>

<script>
import SearchBar from './components/SearchBar.vue';
import PokemonTable from './components/PokemonTable.vue';
import AttackTable from './components/AttackTable.vue';

export default {
  components: {
    SearchBar,
    PokemonTable,
    AttackTable,
  },
  data() {
    return {
      pokemonSearch: '',
      attackSearch: '',
    };
  },
};
</script>

<style>
@import './assets/styles/main.css';
</style>
