<template>
  <div class="create-card_container">
    <div class="page-title">Добавление карточки</div>
    <CreateCard
      cardTypeText="Чтобы добавить карточку, нужно заполнить данные"
    ></CreateCard>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CreateCard from "../components/CreateCard.vue";
export default defineComponent({
  components: { CreateCard },
});
</script>

<style scoped>
.page-title {
  margin-bottom: 20px;
}
.create-card_container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>