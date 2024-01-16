<template>
  <CreatCardForm
    :cardTypeText="cardTypeText"
    :cardType="cardType"
    :isCardType="true"
    @addCard="addCard"
  ></CreatCardForm>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Select from "./visual/Select.vue";
import { useCardStore } from "../stores/card";
import CreatCardForm from "./visual/creatCardForm.vue";
import { useListSaveStore } from "../stores/listCardSave";
import { useCardSaveStore } from "../stores/cardSave";
import { useListStore } from "../stores/listCard";
import { Card as CardInterface } from "../types/card";

interface State {
  item: Object | null;
}

export default defineComponent({
  components: { Select, CreatCardForm },
  props: {
    cardTypeText: {
      type: String as PropType<String>,
      required: true,
    },
    cardType: {
      type: String as PropType<String>,
      required: false,
    },
  },
  data(): State {
    return {
      item: null,
    };
  },
  mounted() {
    this.listStore.setListItems(
      JSON.parse(JSON.stringify(this.listSaveStore.lSave))
    );
    this.cardStore.setCardItems(
      JSON.parse(JSON.stringify(this.cardSaveStore.cSave))
    );
  },
  methods: {
    /**
     * Добавляет карточку в список
     *
     * @param {object} item
     */
    addCard<T extends CardInterface>(item: T) {
      this.cardStore.createCard(item);
      this.upddateCards();
    },
    /**
     * Переход на главную страницу
     */
    indexTransition() {
      this.$router.push({ path: "/" });
    },
    /**
     * Сохранение изменений после соглашения с даилоговым окном
     */
    upddateCards() {
      this.listStore.isInit = false;
      this.cardStore.isInit = false;

      let lists = JSON.parse(JSON.stringify(this.listStore.lists));
      this.listSaveStore.setListItems(lists);

      let cards = JSON.parse(JSON.stringify(this.cardStore.cards));
      this.cardSaveStore.setCardItems(cards);

      this.indexTransition();
    },
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
});
</script>

<style scoped>
:deep(.project-select_button) {
  background: #f0f3f8;
}
:deep(.project-select) {
  width: 100%;
}
</style>