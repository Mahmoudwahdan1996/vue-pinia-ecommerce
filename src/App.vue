<template>
  <Nav />
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Nav from "./components/nvegator/nav.vue";
import { useAuthStore } from "./store/authStore";

export default defineComponent({
  components: { Nav },
  setup() {
    const authStore = useAuthStore();
    authStore.tryLogin();
  },
});
</script>

<style scoped></style>
