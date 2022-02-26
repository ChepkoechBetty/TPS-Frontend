<template>
  <div>
    <form @submit.prevent="submit">
      <h1 class="h3 mb-3 fw-normal">Transfer funds</h1>

      <div class="form-floating">
        <input
          v-model="data.amount"
          type="number"
          class="form-control"
          id="floatingInput"
        />
        <label for="floatingInput">Enter Amount</label>
      </div>
      <button class="w-100 btn btn-lg btn-primary" type="submit">
        Transfer
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
export default {
  name: "TransferView",
  setup() {
    const data = reactive({
      amount: "",
    });
    const router = useRouter();
    const submit = async () => {
      await fetch("http://localhost:44352/api/account/transfer", {
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
