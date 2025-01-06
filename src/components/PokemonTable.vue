<template>
  <table>
    <thead>
    <tr>
      <th>Pokémon (EN)</th>
      <th>Pokémon (FR)</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="pokemon in filteredPokemon" :key="pokemon.en">
      <td>{{ pokemon.en }}</td>
      <td>{{ pokemon.fr }}</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    searchQuery: String,
  },
  data() {
    return {
      pokemonData: [],
    };
  },
  computed: {
    filteredPokemon() {
      if (!this.searchQuery) return this.pokemonData;
      const query = this.searchQuery.toLowerCase();
      return this.pokemonData.filter((pokemon) =>
          pokemon.en.toLowerCase().includes(query) ||
          pokemon.fr.toLowerCase().includes(query)
      );
    },
  },
  async mounted() {
    await this.fetchPokemon();
  },
  methods: {
    async fetchPokemon() {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon-species?limit=10');
        const data = await response.json();

        this.pokemonData = data.results.map(async (pokemon) => {
          const detailsResponse = await fetch(pokemon.url);
          const details = await detailsResponse.json();

          const nameFr = details.names.find((name) => name.language.name === 'fr')?.name || 'Translation Missing';

          return { en: pokemon.name, fr: nameFr };
        });

        this.pokemonData = await Promise.all(this.pokemonData);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      }
    },
  },
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f4f4f4;
}
</style>
