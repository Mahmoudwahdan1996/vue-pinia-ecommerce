<template>
  <nav>
    <router-link to="/">
      <img src="../../assets/imgs/logo.png" alt="Egoan logo" class="logo" />
    </router-link>

    <div class="right">
      <router-link to="/cart">
        <img
          src="../../assets/icons/shopping-bag.png"
          alt="shopping-bag"
          class="shopping-bag"
        />
        <div class="cart-count">{{ totalAmount }}</div>
      </router-link>
      <router-link to="/cart">
        <BIconPersonCircle class="icon" />
      </router-link>

      <router-link to="/auth" v-show="!isAuthenticated"> login </router-link>
      <button v-show="isAuthenticated" @click="logout">logout</button>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { BIconPersonCircle } from "bootstrap-icons-vue";
import { useCartStore } from "../../store/cartStore";
import { useAuthStore } from "../../store/authStore";

export default defineComponent({
  components: {
    BIconPersonCircle,
  },
  setup() {
    const cartStore = useCartStore();
    const authStore = useAuthStore();
    const cartLength = computed(() => {
      return cartStore.getCart.length;
    });

    const totalAmount = computed(() => {
      return cartStore.getTotalAmount;
    });

    const isAuthenticated = computed(() => {
      return authStore.isAuthenticated;
    });

    const logout = () => {
      authStore.logout();
    };

    return {
      cartLength,
      isAuthenticated,
      totalAmount,
      logout,
    };
  },
});
</script>

<style lang="scss" scoped>
nav {
  width: 100%;
  height: 5rem;
  padding: 0.3rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  box-shadow: 0px 0px 7px #000;
  background-color: #fff;
  z-index: 9999;

  .logo {
    width: 8rem;
  }

  .shopping-bag {
    width: 2rem;
    margin-right: 0.3rem;
    transition: 0.3s;
    &:hover {
      transform: scale(1.05);
    }
  }

  .right {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;
    .cart-count {
      position: absolute;
      left: -10px;
      bottom: 0px;
      width: 25px;
      height: 25px;
      background-color: #874afa;
      color: var(--white);
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 600;
      border-radius: 50%;
    }
  }

  .icon {
    color: black;
    font-size: 2rem;
  }
}
</style>
