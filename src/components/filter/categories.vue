<template>
  <div class="categories">
    <h2>Categories</h2>
    <div class="options">
      <div
        v-for="category in categories"
        :key="category.id"
        class="form-control"
      >
        <label :for="category.name">
          <input
            type="checkbox"
            :id="category.name"
            @change="setFilters"
            checked
          />
          <span class="custom-radio" />
          <span class="label-text">{{ category.name }}</span></label
        >
      </div>
    </div>
    <button @click="sendfilter">Filter</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { storeToRefs } from "pinia";

import { useFilterStore } from "../../store/filterStore";
import { Filter } from "../../types/index";
export default defineComponent({
  setup(_props, context) {
    const filterStore = useFilterStore();
    const { categories } = storeToRefs(filterStore);
    filterStore.getAllCategories();

    const filters = ref<Filter>({
      Clothes: true,
      Electronics: true,
      Furniture: true,
      Shoes: true,
      Others: true,
    });

    const setFilters = (e: Event) => {
      const inputId = (e.target as HTMLInputElement).id;
      const isActive = (e.target as HTMLInputElement).checked;
      const updatedFilters = {
        ...filters.value,
        [inputId]: isActive,
      };
      filters.value = updatedFilters;
    };

    const sendfilter = () => {
      context.emit("change-filter", filters.value);
    };

    return {
      categories,
      setFilters,
      sendfilter,
    };
  },
});
</script>

<style lang="scss" scoped>
.categories {
  text-align: center;
  border-bottom: 3px solid var(--light-gray);

  h2 {
    font-weight: 600;
    margin-bottom: 0.8rem;
    color: var(--text);
    font-size: 2, 3rem;
  }

  .options {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: row wrap;
    .form-control {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;
      label {
        display: flex;
        align-items: center;
        margin: 0;
        font-size: 1.2rem;
        color: #5e5873;
        margin-left: 1rem;
        input {
          display: none;
          &:checked + .custom-radio {
            background-color: #7367f0;
            border: none;
          }
        }

        .label-text {
          padding-left: 0.3rem;
        }
        .custom-radio {
          display: inline-block;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          border: 1px solid #7367f0;
        }
      }
    }
  }

  button {
    border: none;
    outline: none;
    border-radius: 10px;
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 1.3rem;
    font-weight: 600;
    width: 65%;
    cursor: pointer;
    padding: 0.5rem 0px;
    position: relative;
    letter-spacing: 0.05rem;
    color: #fff;
    overflow: hidden;
    background-color: black;
    transition: all 0.3s;
    &:hover {
      background: linear-gradient(to right, #8e2de2, #4a00e0);
    }
  }
}
</style>
