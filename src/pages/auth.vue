<template>
  <div class="page">
    <form @submit.prevent="SubmitForm" class="form-auth">
      <div class="form-control">
        <label for="email">E-Mail</label>
        <input type="email" id="email" v-model.trim="email" />
      </div>
      <div class="form-control">
        <label for="password">Password</label>
        <input type="password" id="password" v-model.trim="password" />
      </div>
      <p v-if="!isValidForm">
        please enter a valid email and password (must be at least 6 character
        length)
      </p>
      <button type="submit" class="submit-button">
        {{ submitButtonCaption }}
      </button>
      <button type="button" class="switch" @click="switchAuthMode">
        {{ switchModeButtonCaption }}
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/authStore";

export default defineComponent({
  setup() {
    const email = ref("");
    const password = ref("");
    const isValidForm = ref(true);
    const mode = ref("login");
    const router = useRouter();
    const authStore = useAuthStore();

    const submitButtonCaption = computed(() => {
      if (mode.value === "login") {
        return "Login";
      } else {
        return "Signup";
      }
    });

    const switchModeButtonCaption = computed(() => {
      if (mode.value === "login") {
        return "Signup instead";
      } else {
        return "Login instead";
      }
    });

    async function SubmitForm() {
      isValidForm.value = true;
      if (!email.value.includes("@") && password.value.length < 6) {
        isValidForm.value = false;
        return;
      }

      const actionPayload = {
        email: email.value,
        password: password.value,
      };

      try {
        if (mode.value === "login") {
          await authStore.login(actionPayload);
        } else {
          await authStore.signup(actionPayload);
        }

        router.replace("/products");
      } catch (error) {
        console.log(error);
      }
    }

    function switchAuthMode() {
      if (mode.value === "login") {
        mode.value = "signup";
      } else {
        mode.value = "login";
      }
    }

    return {
      email,
      password,
      isValidForm,
      submitButtonCaption,
      switchModeButtonCaption,
      switchAuthMode,
      SubmitForm,
    };
  },
});
</script>

<style lang="scss" scoped>
.form-auth {
  width: 80%;
  margin: 1rem auto;
  padding: 1rem;
  .form-control {
    margin: 0.5rem 0;
    label {
      font-weight: bold;
      margin-bottom: 0.5rem;
      display: block;
    }

    input {
      display: block;
      width: 100%;
      font: inherit;
      border: 1px solid #ccc;
      padding: 0.15rem;

      &:focus {
        border-color: #3d008d;
        background-color: #faf6ff;
        outline: none;
      }
    }
  }

  button {
    border: none;
    outline: none;
    border-radius: 10px;
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 1.3rem;
    font-weight: 400;
    cursor: pointer;
    padding: 0.5rem 0.8rem;
    position: relative;
    letter-spacing: 0.05rem;
    color: #fff;
    overflow: hidden;
    background-color: black;
    transition: all 0.3s;
  }

  .submit-button {
    &:hover {
      background: linear-gradient(to right, #8e2de2, #4a00e0);
    }
  }

  .switch {
    margin-left: 10px;
  }
}
</style>
