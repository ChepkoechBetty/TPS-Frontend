<template>
  <div>
    <form @submit.prevent="submit">
      <h1 class="h3 mb-3 fw-normal">Please login</h1>
      <div class="text-danger my-2">{{ error }}</div>
      <div class="form-floating">
        <input
          v-model="data.username"
          type="text"
          class="form-control"
          id="floatingInput"
          placeholder="name@example.com"
          required
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
          required
        />
        <label for="floatingPassword">Password</label>
      </div>
      <button class="w-100 btn btn-lg btn-primary" type="submit">Log in</button>
    </form>
  </div>
</template>

<script lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
export default {
  name: "LoginView",
  setup() {
    const data = reactive({
      username: "",
      password: "",
    });
    const error = ref("");
    const router = useRouter();
    const submit = async () => {
      const usr = await fetch(
        "https://tps-backendv1.herokuapp.com/api/User/authenticate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(data),
        }
      )
        .then(function (data) {
          if (data.status != 200) {
            console.log("Invalid credentials", data);
            error.value = "Invalid credentials";
            return false;
          }
          console.log(data);
          router.push("/account");
        })
        .catch(function (errorr) {
          console.log("Request failed", errorr);
        });
    };
    return {
      data,
      submit,
      error,
    };
  },
};
</script>
<style></style>
