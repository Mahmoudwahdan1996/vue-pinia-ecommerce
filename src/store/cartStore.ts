import { defineStore } from "pinia";
import { CartItem, Product, IncOrDec } from "../types/index";

export const useCartStore = defineStore("cart", {
  state() {
    return {
      cart: <CartItem[]>[],
      totalAmount: 0,
      totalPrice: 0,
    };
  },

  actions: {
    calcCartTotal() {
      let total = 0;
      this.cart.map((ele: CartItem) => {
        total += ele.price * ele.amount;
      });
      this.totalPrice = total;
    },
    calcCartAmount() {
      let total = 0;
      this.cart.map((ele: CartItem) => {
        total += ele.amount;
      });
      this.totalAmount = total;
    },

    addToCart(payload: { product: Product; image: string; amount: number }) {
      const { product, image, amount } = payload;
      const tempItem = this.cart.find((p: CartItem) => p.id === product.id);
      if (tempItem) {
        const tempCart = this.cart.map((item: CartItem) => {
          if (item.id === tempItem.id) {
            let newAmount = item.amount + amount;

            return { ...item, amount: newAmount };
          }
          return item;
        });
        this.cart = tempCart;
      } else {
        const newItem = {
          id: product.id,
          title: product.title,
          amount,
          image: image,
          price: product.price,
          category: product.category.name,
          description: product.description,
        };
        this.cart = [...this.cart, newItem];
      }
      this.calcCartTotal();
      this.calcCartAmount();
    },

    toggleAmount(payload: { id: number; value: IncOrDec }) {
      const { id, value } = payload;
      const tempCart = this.cart.map((item: CartItem) => {
        if (item.id === id) {
          if (value === "inc") {
            let newAmount = item.amount + 1;
            return { ...item, amount: newAmount };
          }
          if (value === "dec") {
            let newAmount = item.amount - 1;
            if (newAmount < 1) {
              newAmount = 1;
            }
            return { ...item, amount: newAmount };
          }
        }
        return item;
      });

      this.cart = tempCart;

      this.calcCartAmount();
      this.calcCartTotal();
    },

    deleteItem(id: number) {
      const tempCart = this.cart.filter(
        (product: CartItem) => product.id !== id
      );
      this.cart = tempCart;
      this.calcCartTotal();
      this.calcCartAmount();
    },

    clearCart() {
      this.cart = [];

      this.calcCartTotal();
      this.calcCartAmount();
    },
  },

  getters: {
    getCart(): CartItem[] {
      return this.cart;
    },
    getTotalPrice(): number {
      return this.totalPrice;
    },
    getTotalAmount(): number {
      return this.totalAmount;
    },
  },

  persist: true,
});
