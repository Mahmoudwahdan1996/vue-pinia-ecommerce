<template>
  <div class="card">
    <div class="card-image">
      <img :src="product.images[0]" alt="product img" />
      <div class="label">Category : {{ product.category.name }}</div>
    </div>

    <div class="card-body">
      <router-link :to="productLink">
        <p class="title">
          {{ product.title }}
        </p>
      </router-link>
      <div class="bottom">
        <div class="price">
          <div>Price</div>
          <div>$ {{ product.price }}</div>
        </div>
        <button @click="addToCart">Add</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { Product } from "../../types/index";
import { useCartStore } from "../../store/cartStore";

export default defineComponent({
  props: {
    product: {
      required: true,
      type: Object as PropType<Product>,
    },
  },
  setup(props) {
    const cartStore = useCartStore();

    const productLink = computed(() => {
      return "/products/" + props.product.id;
    });

    function addToCart() {
      const product = {
        product: props.product,
        image: props.product.images[0],
        amount: 1,
      };
      cartStore.addToCart(product);
    }

    return {
      addToCart,
      productLink,
    };
  },
});
</script>

<style lang="scss" scoped>
.card {
  width: 230px;
  height: 370px;
  border: 3px solid var(--light-gray);
  border-radius: 25px;
  overflow: hidden;
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.3);
  .card-image {
    height: 60%;
    position: relative;
    border-bottom: 2px solid var(--light-gray);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }

    .label {
      position: absolute;
      left: 0;
      bottom: -50px;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.3);
      padding: 5px;
      text-align: center;
      color: var(--white);
      transition: 0.3s;
    }
  }

  &:hover .label {
    bottom: 0;
  }

  .card-body {
    height: 40%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px 15px 12px 30px;

    & > p {
      font-size: 1.25rem;
      font-weight: 600;
      max-height: 60%;
      color: var(--text);
      line-height: 30px;
    }

    .bottom {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      .price {
        font-size: 1rem;
        font-weight: 500;
        opacity: 0.7;
        line-height: 20px;
        div:first-child {
          font-size: 1rem;
          font-weight: 500;
          opacity: 0.7;
          line-height: 20px;
        }
        div:last-child {
          font-size: 1.4rem;
          font-weight: 600;
        }
      }

      button {
        background-color: transparent;
        border: 2px solid var(--dark-gray);
        padding: 5px 15px;
        border-radius: 10px;
        font-size: 1.2rem;
        font-weight: 600;
        height: fit-content;
        cursor: pointer;
        color: var(--text);
        position: relative;
        overflow: hidden;
        transition: 0.3s;
        z-index: 2;
        outline: none;

        &:hover {
          color: var(--white);
          border-color: var(--white);
          background-color: var(--dark-gradient);
        }
      }
    }
  }
}
</style>
