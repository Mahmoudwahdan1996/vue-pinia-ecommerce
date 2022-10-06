<template>
  <div class="pagination">
    <span class="left">
      <BIconArrowLeft />
    </span>
    <span class="active"> 1</span>
    <span>2</span>
    <span>3</span>
    <span>4</span>
    <span>5</span>

    <span class="right">
      <BIconArrowRight />
    </span>
  </div>
</template>



<script lang="ts">
import { defineComponent } from "vue";
import { BIconArrowLeft, BIconArrowRight } from "bootstrap-icons-vue";
export default defineComponent({
  components: {
    BIconArrowLeft,
    BIconArrowRight,
  },
  setup() {},
});
</script>

<style lang="scss" scoped>
.pagination {
  text-align: center;
  width: 90%;
  margin: 1.5rem auto;
  span {
    display: inline-block;
    width: 40px;
    height: 40px;
    text-align: center;
    border-radius: 50%;
    background-color: var(--dark-gray);
    margin: 0 0.4rem;
    padding-top: 7px;
  }

  .left {
    margin-right: 0.6rem;
  }

  .right {
    margin-left: 0.6rem;
  }
}
</style>
