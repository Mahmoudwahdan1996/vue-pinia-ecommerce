<template>
  <div class="left">
    <img class="active-img" :src="images[activeImage]" alt="" />
    <div class="slides">
      <span class="after" @click="slideTo('next')"> > </span>
      <div v-for="(image, index) in images" :key="index">
        <img :src="image" alt="" @click="selectImage(index)" />
      </div>

      <span class="before" @click="slideTo('prev')"> &lt;</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";

import { Dir } from "../../types/index";

export default defineComponent({
  props: {
    images: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },

  setup(props) {
    const activeImage = ref(0);

    const selectImage = (index: number) => {
      activeImage.value = index;
    };

    const slideTo = (dir: Dir) => {
      if (dir === "next") {
        if (activeImage.value === props.images.length - 1) {
          activeImage.value = 0;
        } else {
          activeImage.value++;
        }
      }

      if (dir === "prev") {
        if (activeImage.value === 0) {
          activeImage.value = props.images.length - 1;
        } else {
          activeImage.value--;
        }
      }
    };

    return {
      activeImage,
      selectImage,
      slideTo,
    };
  },
});
</script>

<style lang="scss" scoped>
.left {
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border: 2px solid var(--light-gray);
  border-bottom: none;
  padding: 40px 10px 20px 10px;

  .active-img {
    width: 80%;
    margin-bottom: 20px;
    border-radius: 20px;
  }

  .slides {
    display: flex;
    justify-content: center;
    gap: 20px;
    position: relative;
    & span.after,
    & span.before {
      font-size: 3rem;
      color: var(--dark-gray);
      position: absolute;
      top: 0px;
      cursor: pointer;
    }
    & span.after {
      content: ">";
      right: -40px;
    }
    & span.before {
      content: "<";
      left: -40px;
    }

    & > div {
      width: 70px;
      height: 70px;
      border-radius: 10px;
      border: 2px solid var(--light-gray);
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
