<template>
  <div>
    <div class="search">
      <input
        type="text"
        :value="searchInput"
        @input="setText"
        placeholder="Search"
      />
      <a @click="toggleFilter">
        <BIconSliders2Vertical class="filter-icon" />
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { BIconSliders2Vertical } from "bootstrap-icons-vue";
import { storeToRefs } from "pinia";

import { useFilterStore } from "../../store/filterStore";

export default defineComponent({
  components: {
    BIconSliders2Vertical,
  },
  setup() {
    const filterStore = useFilterStore();
    const { searchInput } = storeToRefs(filterStore);

    const toggleFilter = filterStore.toggleFilter;

    const setText = (e: Event) => {
      const value = (e.target as HTMLInputElement).value;
      searchInput.value = value;
      filterStore.filterByText(searchInput.value);
    };

    return {
      searchInput,
      toggleFilter,
      setText,
    };
  },
});
</script>

<style lang="scss" scoped>
.search {
  width: 100%;
  margin: 1rem auto;
  padding: 1rem 0.8rem 0rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  & input {
    width: 70%;
    padding: 0.5rem 1rem;
    font-size: 1.3rem;
    outline: none;
    border: 3px solid var(--light-gray);
    border-radius: 10px;
  }

  & .filter-icon {
    font-size: 2.5rem;
    color: var(--text);
    opacity: 0.8;
    cursor: pointer;
  }
}
</style>
