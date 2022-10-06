import { defineStore } from "pinia";
import { Authentication, Auth } from "../types/index";

let timer: number | undefined;

export const useAuthStore = defineStore("auth", {
  state() {
    return {
      token: "" as string,
    };
  },
  actions: {
    async login(payload: Auth) {
      return this.auth({ ...payload, mode: "login" });
    },
    async signup(payload: Auth) {
      return this.auth({ ...payload, mode: "signup" });
    },
    async auth(payload: Authentication) {
      const mode = payload.mode;

      let url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDvV5tRNdB67fd3s2iTfpB18iF4jLhEiOg";

      if (mode === "signup") {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDvV5tRNdB67fd3s2iTfpB18iF4jLhEiOg";
      }
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }),
      });
      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(
          responseData.message ||
            "Failed to authenticate. Check your login data."
        );
        throw error;
      }
      const expiresIn = +responseData.expiresIn * 1000;
      //  const expiresIn = 5000;
      const expirationDate = new Date().getTime() + expiresIn;
      localStorage.setItem("token", responseData.idToken);
      localStorage.setItem("tokenExpiration", expirationDate.toString());
      timer = setTimeout(() => {
        this.logout();
      }, expiresIn);
      this.token = responseData.idToken;
    },

    async tryLogin() {
      const token = localStorage.getItem("token");
      const expirationDate = localStorage.getItem("tokenExpiration")!;
      const expiresIn = +expirationDate - new Date().getTime();
      if (expiresIn < 0) {
        return;
      }
      timer = setTimeout(() => {
        this.logout();
      }, expiresIn);
      if (token) {
        this.token = token;
      }
    },
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiration");
      clearTimeout(timer);
      this.token = "";
    },
  },
  getters: {
    isAuthenticated(): boolean {
      return !!this.token;
    },
    getToken(): string {
      return this.token;
    },
  },
});
