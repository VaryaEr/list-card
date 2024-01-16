<template>
  <div v-if="listStore.lists != null" class="card-table">
    <List v-for="el in listStore.lists" :key="el.id" :listItem="el"></List>
  </div>
</template>
  
<script lang="ts">
import { defineComponent } from "vue";
import List from "./List.vue";
import { useListStore } from "../stores/listCard";

export default defineComponent({
  components: { List },
  computed: {
    listStore: () => {
      return useListStore();
    },
  },
});
</script>
  
<style scoped>
.card-table {
  display: flex;
  gap: 20px;
}
</style>