import { defineStore } from "pinia";
import { Categ, Product, Filter, PriceRange } from "../types/index";

export const useFilterStore = defineStore("filter", {
  state: () => ({
    categories: [] as Categ[],
    searchInput: "",
    showFilter: false as boolean,
    filterdProducts: <Product[]>[],
    products: <Product[]>[],
  }),
  getters: {
    allCategories(): Categ[] {
      return this.categories;
    },
    show(): boolean {
      return this.showFilter;
    },
    getProducts(): Product[] {
      return this.products;
    },
    getFilteredProducts(): Product[] {
      return this.filterdProducts;
    },
  },
  actions: {
    async getAllProducts(limit: number = 25, offset: number = 0) {
      const response = await fetch(
        `https://api.escuelajs.co/api/v1/products?limit=${limit}&offset=${offset}`
      );
      const data = await response.json();
      this.products = data;
      this.filterdProducts = data;
    },
    async getAllCategories() {
      const response = await fetch(
        "https://api.escuelajs.co/api/v1/categories?limit=5"
      );
      const data = await response.json();
      this.categories = data;
    },

    filterByCategoryAndPrice(payload: { category: Filter; price: PriceRange }) {
      this.filterdProducts = this.products.filter((p: Product) => {
        if (
          payload.category.Clothes &&
          p.category.name.includes("Clothes") &&
          payload.price.maxPrice >= p.price &&
          payload.price.minPrice <= p.price
        ) {
          return true;
        }
        if (
          payload.category.Electronics &&
          p.category.name.includes("Electronics") &&
          payload.price.maxPrice >= p.price &&
          payload.price.minPrice <= p.price
        ) {
          return true;
        }
        if (
          payload.category.Furniture &&
          p.category.name.includes("Furniture") &&
          payload.price.maxPrice >= p.price &&
          payload.price.minPrice <= p.price
        ) {
          return true;
        }
        if (
          payload.category.Shoes &&
          p.category.name.includes("Shoes") &&
          payload.price.maxPrice >= p.price &&
          payload.price.minPrice <= p.price
        ) {
          return true;
        }
        if (
          payload.category.Others &&
          p.category.name.includes("Others") &&
          payload.price.maxPrice >= p.price &&
          payload.price.minPrice <= p.price
        ) {
          return true;
        }
        return false;
      });
    },

    filterByText(payload: string) {
      this.filterdProducts = this.filterdProducts.filter((p: Product) => {
        if (p.title.includes(payload)) {
          return true;
        }
        return false;
      });
    },

    toggleFilter() {
      this.showFilter = !this.showFilter;
    },
  },
});
