<template>
  <div class="prices">
    <h1>Prices</h1>
    <form @submit.prevent="sendfilter">
      <div class="range">
        <input
          type="number"
          min="10"
          max="10000"
          id="minPrice"
          placeholder="Min"
          :value="priceRange.minPrice"
          @input="filteredPrice"
        />
        <input
          type="number"
          min="10"
          max="10000"
          id="maxPrice"
          placeholder="Max"
          :value="priceRange.maxPrice"
          @input="filteredPrice"
        />
      </div>
      <button type="submit">Set Price</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { PriceRange } from "../../types/index";
export default defineComponent({
  setup(_props, context) {
    let priceRange = ref<PriceRange>({
      maxPrice: 4000,
      minPrice: 10,
    });
    // const { maxPrice, minPrice } = toRefs<PriceRange>(priceRange);

    const filteredPrice = (e: Event) => {
      const name = (e.target as HTMLInputElement).id;
      const value = (e.target as HTMLInputElement).value;
      let updatePrice: PriceRange = {
        ...priceRange.value,
        [name]: +value,
      };
      priceRange.value = updatePrice;
    };
    const sendfilter = () => {
      context.emit("price-filter", priceRange.value);
    };
    return {
      priceRange,
      filteredPrice,
      sendfilter,
    };
  },
});
</script>

<style lang="scss" scoped>
.prices {
  text-align: center;
  padding: 1.5rem 0;
  h1 {
    font-weight: 600;
    margin-bottom: 0.8rem;
    color: var(--text);
    font-size: 2, 3rem;
  }
  .range {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    input {
      border: 2px solid var(--light-gray);
      background-color: var(--body-color);
      width: 110px;
      height: 60px;
      font-size: 1.5rem;
      padding: 10px;
      border-radius: 10px;
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
