<template>
  <div class="actions">
    <FiltersProject></FiltersProject>
    <button @click="createCardTransition()" class="add-card btn-primary">
      Добавить карточку
    </button>
    <button @click.prevent="showModal = true" class="save-changes btn-primary">
      Сохранить изменения
    </button>
  </div>
  <Confirm
    v-if="showModal"
    @closeModal="closeModal()"
    @succsessModal="succsessModal()"
  ></Confirm>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FiltersProject from "./FiltersProject.vue";
import CreateCard from "./modal/CreateCard.vue";
import { useListStore } from "../stores/listCard";
import { useCardStore } from "../stores/card";
import { useListSaveStore } from "../stores/listCardSave";
import { useCardSaveStore } from "../stores/cardSave";
import Confirm from "./modal/Confirm.vue";

interface State {
  showModal: boolean;
}
export default defineComponent({
  components: { FiltersProject, CreateCard, Confirm },
  data(): State {
    return {
      showModal: false,
    };
  },
  computed: {
    listStore: () => {
      return useListStore();
    },
    cardStore: () => {
      return useCardStore();
    },
    listSaveStore: () => {
      return useListSaveStore();
    },
    cardSaveStore: () => {
      return useCardSaveStore();
    },
  },
  methods: {
    /**
     * Открывает страницу create-card
     */
    createCardTransition() {
      this.$router.push({ path: "/create-card" });
    },
    /**
     * Закрывает модальное окно
     */
    closeModal() {
      this.showModal = false;
    },
    /**
     * Сохранение изменений после соглашения с даилоговым окном
     */
    succsessModal() {
      this.listStore.isInit = false;
      this.cardStore.isInit = false;

      let lists = JSON.parse(JSON.stringify(this.listStore.lists));
      this.listSaveStore.setListItems(lists);

      let cards = JSON.parse(JSON.stringify(this.cardStore.cards));
      this.cardSaveStore.setCardItems(cards);
      this.closeModal();
      this.$router.go(0);
    },
  },
});
</script>

<style scoped>
.actions {
  display: flex;
  gap: 8px;
  align-items: flex-end;
}
</style>