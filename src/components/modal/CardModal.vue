<template>
  <div class="modal-container">
    <div class="modal-content">
      <CreatCardForm
        :cardTypeText="cardTypeText"
        :cardType="cardType"
        :isCardType="false"
        @closeModal="closeModal()"
        @addCard="addCard"
        @changeCard="changeCard"
        :cardItem="cardItem"
      ></CreatCardForm>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Select from "../visual/Select.vue";
import { useCardStore } from "../../stores/card";
import CreatCardForm from "../visual/creatCardForm.vue";
import { Card as CardInterface } from "../../types/card";

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
      required: true,
    },
    cardItem: {
      type: Object as PropType<CardInterface>,
      required: false,
    },
  },
  data(): State {
    return {
      item: null,
    };
  },
  mounted() {
    if (this.cardItem) {
      this.item = this.cardItem;
    }
  },
  methods: {
    /**
     * Знакрывает модальное окно
     */
    closeModal() {
      this.$emit("closeModal");
    },
    /**
     * Добавляет карточку
     *
     * @param {Object} item
     */
    addCard<T extends CardInterface>(item: T) {
      this.cardStore.createCard(item);
      this.closeModal();
    },
    /**
     * Обновляет картоку
     *
     * @param {object} item
     */
    changeCard<T extends CardInterface>(item: T) {
      this.cardStore.changeCard(item);
      this.closeModal();
    },
  },
  computed: {
    cardStore: () => {
      return useCardStore();
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