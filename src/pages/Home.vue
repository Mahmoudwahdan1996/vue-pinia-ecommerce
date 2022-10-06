<template>
  <div class="page">
    <aside class="filter-section" v-show="showFilter">
      <Categories @change-filter="updateFilters" />
      <Prices @price-filter="updatePrice" />
    </aside>
    <Search />
    <div class="products-container">
      <ProductItem
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from "vue";
import { useFilterStore } from "../store/filterStore";

import Categories from "../components/filter/categories.vue";
import Prices from "../components/filter/prices.vue";
import Search from "../components/filter/search.vue";
import ProductItem from "../components/products/productItem.vue";
import { Filter } from "../types/index";
import { PriceRange } from "../types/index";

export default defineComponent({
  components: {
    Search,
    Categories,
    Prices,
    ProductItem,
  },
  setup() {
    // const store = useProductsStore();
    const filterStore = useFilterStore();
    const showFilter = computed((): boolean => {
      return filterStore.show;
    });

    const activeFilters = ref<Filter>({
      Clothes: true,
      Electronics: true,
      Furniture: true,
      Shoes: true,
      Others: true,
    });

    const priceRange = ref<PriceRange>({
      maxPrice: 4000,
      minPrice: 10,
    });

    const updatePrice = (updatedPrice: PriceRange) => {
      priceRange.value = updatedPrice;
    };

    const updateFilters = (filters: Filter) => {
      activeFilters.value = filters;
    };

    filterStore.getAllCategories();
    filterStore.getAllProducts();

    watch([activeFilters, priceRange], () => {
      const payload = {
        category: { ...activeFilters.value },
        price: { ...priceRange.value },
      };
      filterStore.filterByCategoryAndPrice(payload);
    });

    const filteredProducts = computed(() => {
      return filterStore.getFilteredProducts;
    });

    return { updateFilters, showFilter, updatePrice, filteredProducts };
  },
});
</script>

<style lang="scss" scoped>
aside {
  border-bottom: 3px solid var(--light-gray);
}
.products-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 30px;
}
</style>
