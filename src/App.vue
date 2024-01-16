
<template>
  <main>
    <div class="content-container container-fluid">
      <router-view></router-view>
    </div>
  </main>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import FiltersProject from "./components/FiltersProject.vue";

export default defineComponent({
  components: { FiltersProject },
});
</script>
<style scoped>
.container-fluid {
  padding: 50px 20px;
  max-width: 1440px;
  margin: auto;
}
main {
  background: #e5e9ef;
  min-height: 100vh;
}
</style>
