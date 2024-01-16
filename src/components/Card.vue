<template>
  <div class="card-el">
    <div class="card_content">
      <div class="card_head">
        <div class="card_name">{{ cardItem.title }}</div>
        <img
          @click="showModal = true"
          class="card_edit"
          src="../assets/images/icons/NoteEdit.svg"
        />
        <img
          class="card_delete"
          @click="removeCard(cardItem)"
          src="../assets/images/icons/Garbage.svg"
        />
      </div>
      <div class="car_body">
        <div class="card_point simple-text">
          <div class="card-point_title">Балл:</div>
          <div class="card-point_val">{{ cardItem.score }}</div>
        </div>
        <div v-if="cardItem.project !== false" class="card_project">
          <div
            v-for="(el, index) in cardItem.project"
            :key="index"
            class="card-project_button"
          >
            {{
              cardProject.projects
                ? cardProject.projects.find((item) => item.code === el)?.name
                : el
            }}
          </div>
        </div>
      </div>
    </div>
    <div class="card_menu">
      <img
        class="card_delete"
        src="../assets/images/icons/OverflowMenuSecond.svg"
      />
    </div>
    <CardModal
      :cardTypeText="cardTypeText"
      :cardType="cardItem.stage"
      :cardItem="cardItem"
      v-if="showModal"
      @closeModal="closeModal()"
    ></CardModal>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Card as CardInterface } from "../types/card";
import { useProjectStore } from "../stores/project";
import { useCardStore } from "../stores/card";
import CardModal from "./modal/CardModal.vue";

interface State {
  showModal: boolean;
}

export default defineComponent({
  components: { CardModal },
  props: {
    cardItem: {
      type: Object as PropType<CardInterface>,
      required: true,
    },
    cardTypeText: {
      type: String as PropType<String>,
      required: true,
    },
  },
  data(): State {
    return {
      showModal: false,
    };
  },
  methods: {
    removeCard<T extends CardInterface>(item: T) {
      this.cardStore.removeCard(item);
    },
    /**
     * Знакрывает модальное окно
     */
    closeModal() {
      this.showModal = false;
    },
  },
  computed: {
    cardProject: () => {
      return useProjectStore();
    },
    cardStore: () => {
      return useCardStore();
    },
  },
});
</script>

<style scoped>
.card-el {
  display: flex;
  padding: 12px 0px;
  height: 120px;
  background: white;
  width: 100%;
  justify-content: space-between;
  border-radius: 4px;
}
.card_content {
  padding: 0 12px;
  margin-right: 8px;
  display: flex;
  flex-direction: column;
}
.card_head {
  margin-bottom: 8px;
  display: flex;
}
.car_body {
  display: flex;
  flex-direction: column;
  height: -webkit-fill-available;
}
.card_name {
  color: #38393d;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-right: 8px;
}
.card_head img {
  width: 17px;
  height: 17px;
  cursor: pointer;
}
.card_edit {
  margin-right: 4px;
}
.card-point_val {
  margin-left: 4px;
  color: #38393d;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}
.card_project {
  display: flex;
  gap: 10px;
  margin-top: auto;
}
.card-project_button {
  border-radius: 4px;
  border: 1px solid #d2dae4;
  background: #e5e9ef;
  color: #7d8ca1;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding: 4px 8px;
}
.card_menu {
  padding: 0 8px;
}
.card_delete {
  width: 16px;
  height: 16px;
}
</style>