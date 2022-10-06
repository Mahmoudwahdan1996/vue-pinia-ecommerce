<template>
  <div class="prod-sell">
    <div class="left">
      <div class="image">
        <img :src="item.image" alt="Product" />
      </div>
      <div class="info">
        <h1>{{ item.title }}</h1>
        <p>{{ time }}</p>
      </div>
    </div>
    <div class="right">
      <div class="amount">
        <button>
          <BIconDash @click="incOrDecAmount(item.id, 'dec')" />
        </button>
        <div>{{ item.amount }}</div>
        <button>
          <BIconPlus @click="incOrDecAmount(item.id, 'inc')" />
        </button>
      </div>
      <span>
        <div class="total-price">{{ totalPrice }}$</div>
        <BIconXSquare class="delete-icon" @click="deleteItem(item.id)" />
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed } from "vue";
import { CartItem } from "../../types";
import { BIconDash, BIconPlus, BIconXSquare } from "bootstrap-icons-vue";
import { useCartStore } from "../../store/cartStore";
import { IncOrDec } from "../../types/index";

export default defineComponent({
  components: { BIconDash, BIconPlus, BIconXSquare },
  props: {
    item: {
      type: Object as PropType<CartItem>,
      required: true,
    },
  },
  setup(props) {
    const cartStore = useCartStore();
    const item = computed(() => {
      return props.item;
    });

    console.log(item.value);

    const time = new Date().toLocaleDateString();
    const totalPrice = computed(() => item.value.amount * item.value.price);

    const deleteItem = (id: number) => {
      cartStore.deleteItem(id);
    };

    const incOrDecAmount = (id: number, value: IncOrDec) => {
      const amount = { id, value };
      cartStore.toggleAmount(amount);
    };

    return {
      item,
      time,
      totalPrice,
      deleteItem,
      incOrDecAmount,
    };
  },
});
</script>

<style lang="scss" scoped>
.prod-sell {
  min-height: 170px;
  display: flex;
  align-items: center;
  background-color: #e5e5e5;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  padding: 30px 0px;

  &:nth-child(even) {
    background-color: rgb(237, 237, 237);
  }

  .left,
  .right {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  }

  .right {
    justify-content: center;

    .amount {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 20px;
      width: 100%;
      button {
        border: none;
        outline: none;
        background-color: transparent;
        font-size: 2rem;
        margin: 10px 0 0px;
        cursor: pointer;
        transition: 0.3s;
      }

      & > div {
        font-size: 1.3rem;
        font-weight: 600;
        border: 2px solid rgba(0, 0, 0, 0.3);
        border-radius: 5px;
        padding: 5px 30px;
      }
    }

    & > span {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      gap: 40px;

      .total-price {
        font-size: 1.4rem;
        margin-top: 5px;
      }

      .delete-icon {
        font-size: 1.6rem;
        margin-top: 5px;
        cursor: pointer;
      }
    }
  }

  .left {
    .image {
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100px;
      height: 100px;
      img {
        width: 100%;
      }
    }

    .info {
      text-align: center;
      max-width: 100%;
    }
  }
}
</style>
