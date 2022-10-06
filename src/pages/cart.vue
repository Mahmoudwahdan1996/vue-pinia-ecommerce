<template>
  <section class="page cart">
    <div class="top">
      <div>
        <h3>Total Price : {{ totalPrice }} $</h3>
        <h3>Total Amount: {{ totalAmount }}</h3>
      </div>
      <button @click="clearCart">Clear ({{ cartLength }})</button>
    </div>
    <section v-if="cartLength">
      <CartItem v-for="itme in items" :key="itme.id" :item="itme" />
    </section>
    <section v-else class="no-item">
      <h1>
        No items in cart
        <router-link to="/products" class="products-link">
          go products</router-link
        >
      </h1>
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useCartStore } from "../store/cartStore";

import CartItem from "../components/cart/cartItem.vue";

export default defineComponent({
  components: {
    CartItem,
  },
  setup() {
    const cartStore = useCartStore();

    const items = computed(() => {
      return cartStore.getCart;
    });

    const cartLength = computed(() => {
      return cartStore.getCart.length;
    });

    const totalAmount = computed(() => {
      return cartStore.getTotalAmount;
    });

    const totalPrice = computed(() => {
      return cartStore.getTotalPrice;
    });

    const clearCart = () => {
      cartStore.clearCart();
    };
    return {
      items,
      clearCart,
      cartLength,
      totalPrice,
      totalAmount,
    };
  },
});
</script>

<style lang="scss" scoped>
.cart {
  min-height: 80vh;
  padding: 15vh 10vw 60px;
  .top {
    display: flex;
    gap: 30px;
    align-items: center;
    button {
      border: none;
      outline: none;
      background-color: #874afa;
      font-size: 1.2rem;
      cursor: pointer;
      color: var(--white);
      padding: 10px 30px;
      border-radius: 5px;
      transition: 0.3s;
      &:hover {
        background-color: #682dd6;
      }
    }
  }

  section {
    margin-top: 30px;
  }

  .no-item {
    text-align: center;
    margin-top: 50px;
    .products-link {
      display: inline-block;
      padding: 4px 7px;
      border-radius: 3px;
      color: #fff;
      background: linear-gradient(to right, #8e2de2, #4a00e0);
    }
  }
}
</style>
