<template>
  <div class="page">
    <div class="product-info">
      <ProductImagesSlider :images="images" />
      <ProductDetails :product="selectedProduct" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";

import ProductImagesSlider from "../components/product/productImagesSlider.vue";
import ProductDetails from "../components/product/productDetails.vue";

import { Product } from "../types/index";

export default defineComponent({
  components: { ProductImagesSlider, ProductDetails },
  props: {
    id: {
      type: String,
    },
  },
  setup(props) {
    const selectedProduct = ref<Product>();

    const images = computed(() => {
      return selectedProduct.value?.images;
    });

    async function findProduct() {
      try {
        const response = await fetch(
          `https://api.escuelajs.co/api/v1/products/${props.id}`
        );
        const data = await response.json();

        selectedProduct.value = data;
      } catch (error) {
        throw new Error("some thing went Wrong");
      }
    }

    findProduct();

    return {
      images,
      selectedProduct,
    };
  },
});
</script>

<style lang="scss" scoped>
.product-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
