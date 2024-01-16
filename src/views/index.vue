<template>
  <div class="header-block">
    <div class="page-title">Главная страница</div>
    <Action></Action>
  </div>
  <Table></Table>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Table from "../components/Table.vue";
import Action from "../components/Action.vue";
export default defineComponent({
  components: {
    Table,
    Action,
  },
});
</script>

<style scoped>
.header-block {
  display: flex;
  margin-bottom: 20px;
  width: 100%;
  justify-content: space-between;
}
</style>