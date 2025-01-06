<template>
  <table>
    <thead>
    <tr>
      <th>Attack (EN)</th>
      <th>Attack (FR)</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="attack in filteredAttacks" :key="attack.en">
      <td>{{ attack.en }}</td>
      <td>{{ attack.fr }}</td>
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
      attackData: [],
    };
  },
  computed: {
    filteredAttacks() {
      if (!this.searchQuery) return this.attackData;
      const query = this.searchQuery.toLowerCase();
      return this.attackData.filter((attack) =>
          attack.en.toLowerCase().includes(query) ||
          attack.fr.toLowerCase().includes(query)
      );
    },
  },
  async mounted() {
    await this.fetchAttacks();
  },
  methods: {
    async fetchAttacks() {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/move?limit=10');
        const data = await response.json();

        this.attackData = data.results.map(async (attack) => {
          const detailsResponse = await fetch(attack.url);
          const details = await detailsResponse.json();

          const nameFr = details.names.find((name) => name.language.name === 'fr')?.name || 'Translation Missing';

          return { en: attack.name, fr: nameFr };
        });

        this.attackData = await Promise.all(this.attackData);
      } catch (error) {
        console.error('Error fetching attack data:', error);
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
