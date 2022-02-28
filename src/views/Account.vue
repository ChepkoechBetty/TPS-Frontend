<template>
  <main>
    <div class="row">
      <div class="col">
        <div class="card">
          <div class="card-header py-3">
            <h4 class="my-0 fw-normal">{{ message }}</h4>
          </div>
          <div class="card-body">
            <h1 class="card-title">Account Balance</h1>
            <ul class="list-unstyled mt-3 mb-4">
              {{
                balance
              }}
            </ul>
            <div>
              <router-link to="/transfer" class="btn-outline-primary">Transfer</router-link>|
              <router-link to="/withdraw" class="btn-outline-primary">Withdraw</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { onMounted, ref } from "vue";
import {useStore} from "vuex";
export default {
  name: "AccountView",
  setup() {
    const message = ref("You are not logged in!");
    const balance = ref();
    const store = useStore();
    onMounted(async () => {
      try {
        const response = await fetch(
          "http://tps-backendv1.herokuapp.com/api/User/account",
          {
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );
        const content = await response.json();
        balance.value = `Kshs: ${content.accBalance}`;
        message.value = `Hello ${content.accName}`;
       await store.dispatch('setAuth', true);
      } catch (e) {
        await store.dispatch('setAuth', false);
      }
    });
    return {
      message,
      balance,
    };
  },
};
</script>
