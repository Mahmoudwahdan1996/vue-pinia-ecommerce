<template>
  <div class="product-details">
    <div class="top">
      <div class="category">
        Category : <span>{{ product.category.name }}</span>
      </div>
      <h1>{{ product.title }}</h1>
      <p class="disc">{{ product.description }}</p>
      <h2>$ {{ product.price }}</h2>
      <h3>ID :{{ product.id }}</h3>
    </div>
    <div class="middle">
      <div class="info">
        <div>
          <h4>Quantity</h4>
          <div class="btn-group">
            <button class="btn" id="plusBtn" @click="icreaseAmount">+</button>
            <span class="btn" id="amount"> {{ amount }} </span>
            <button class="btn" id="minusBtn" @click="decreaseAmount">-</button>
          </div>
        </div>
        <h1>
          Total : <span>{{ product.price * amount }} $</span>
        </h1>
      </div>
      <div class="add-to-cart">
        <button class="btn btn-primary" @click="addToCart">
          ADD TO CARD
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { useCartStore } from "../../store/cartStore";

import { Product } from "../../types/index";

export default defineComponent({
  props: {
    product: {
      type: Object as PropType<Product>,
      required: true,
    },
  },
  setup(props) {
    const amount = ref(1);
    const cartStore = useCartStore();

    const icreaseAmount = () => {
      if (amount.value >= 10) {
        return;
      }

      return amount.value++;
    };

    const decreaseAmount = () => {
      if (amount.value <= 1) {
        amount.value = 1;
        return;
      }

      return amount.value--;
    };

    function addToCart() {
      const product = {
        product: props.product,
        image: props.product.images[0],
        amount: amount.value,
      };
      cartStore.addToCart(product);
    }

    return {
      amount,
      decreaseAmount,
      icreaseAmount,
      addToCart,
    };
  },
});
</script>

<style lang="scss" scoped>
.product-details {
  border: 2px solid var(--light-gray);
  width: 80%;
  .top {
    padding: 2rem 1.2rem 1.4rem;
    border-bottom: 2px solid var(--light-gray);
    .category {
      font-size: 1.4rem;
      font-weight: 500;
      opacity: 0.7;
      margin-bottom: 20px;
    }

    h1 {
      color: #4b505e;
      font-size: 1.4rem;
      line-height: 25px;
      font-weight: 500;
      overflow: hidden;
      margin-bottom: 0.8rem;
    }

    .disc {
      min-height: 120px;
      margin: 10px 0px;
      opacity: 0.7;
    }

    h2 {
      font-weight: 600;
      font-size: 2.6rem;
      opacity: 0.9;
      color: var(--text);
    }

    h3 {
      font-size: 1rem;
      color: var(--text);
    }
  }

  .middle {
    display: flex;
    align-items: flex-end;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-right: 10px;
    padding: 2rem 1.2rem 1.4rem;

    .info {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      width: 100%;

      .btn-group {
        margin-top: 10px;

        .btn {
          padding: 6px 10px;
          font-size: 1.2rem;
          font-weight: 700;
          border: none;
          transition: 0.3s;
          outline: none;

          cursor: pointer;
          &:nth-child(3) {
            border-radius: 0px 5px 5px 0px;
          }
          &:nth-child(1) {
            border-radius: 5px 0px 0px 5px;
          }
        }
        span {
          background-color: #e4e4e4;
          cursor: default;
        }
      }

      h1 {
        font-size: 1.3rem;
      }
    }

    .add-to-cart {
      width: 100%;

      button {
        width: 100%;
        font-weight: 500;
        font-size: 1.3rem;
        padding-top: 15px;
        margin-top: 15px;
        padding-bottom: 15px;
        border: none;
        background: linear-gradient(
          -45deg,
          var(--light-gradient),
          var(--dark-gradient)
        );
        color: var(--white) !important;
        transition: 0.4s;
        border-radius: 10px;
        cursor: pointer;
      }
    }
  }
}
</style>
