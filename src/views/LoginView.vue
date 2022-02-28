<template>
  <div>
    <form @submit.prevent="submit">
      <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

      <div class="form-floating">
        <input
          v-model="data.username"
          type="text"
          class="form-control"
          id="floatingInput"
          placeholder="name@example.com"
        />
        <label for="floatingInput">Username</label>
      </div>
      <div class="form-floating">
        <input
          v-model="data.password"
          type="password"
          class="form-control"
          id="floatingPassword"
          placeholder="Password"
        />
        <label for="floatingPassword">Password</label>
      </div>
      <button class="w-100 btn btn-lg btn-primary" type="submit">
        Sign in
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
export default {
  name: "LoginView",
  setup() {
    const data = reactive({
      username: "",
      password: "",
    });
    const router = useRouter();
    const submit = async () => {
      await fetch("https://tps-backendv1.herokuapp.com/api/User/authenticate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });
      await router.push("/account");
    };
    return {
      data,
      submit,
    };
  },
};
</script>
<style></style>
