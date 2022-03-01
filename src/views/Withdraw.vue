<template>
  <div>
    <form @submit.prevent="submit">
      <h1 class="h3 mb-3 fw-normal">Transfer funds</h1>
     <div class="text-danger my-2">{{ error }}</div>
      <div class="form-floating">
        <input
          v-model="data.amount"
          type="number"
          class="form-control"
          id="floatingInput"
          required
        />
        <label for="floatingInput">Enter Amount</label>
      </div>
      <button class="w-100 btn btn-lg btn-primary" type="submit">
        Transfer
      </button>
      <router-link to="/account" class="nav-link">Back</router-link>
    </form>
  </div>
</template>

<script lang="ts"> 
import { reactive,ref} from "vue";
import { useRouter } from "vue-router";
export default {
  name: "WithdrawView",
  setup() {
    const data = reactive({
      amount: "",
      atmName: "ATM_A",
    });
    const error = ref("");
    const router = useRouter();
    const submit = async () => {
      await fetch("https://tps-backendv1.herokuapp.com/api/account/withdraw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      }).then(function (data) {
    if(data.status!=200){
    console.log('Insufficient funds to make this transaction', data);
    error.value='Insufficient funds to make this transaction';
    return false; 
    }
    console.log(data)
    router.push("/account");
  });
    };
    return {
      data,
      submit,
      error
    };
  },
};
</script>
<style></style>
