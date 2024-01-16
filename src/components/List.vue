<template>
  <div class="card-list">
    <div class="list_header">
      <div class="list_title">
        <div class="list-title_point"></div>
        <div class="list-title_name">{{ listItem.name }}</div>
      </div>
      <div class="list-filter">
        <img
          @click="sortListCard()"
          class="list-filter_arrow"
          src="../assets/images/icons/ArrowDown.svg"
        />
        <img
          @click="sortListCardReverse()"
          class="list-filter_arrow-reverse"
          src="../assets/images/icons/ArrowDown.svg"
        />
      </div>
    </div>
    <div class="list-content">
      <draggable
        v-if="listItem.cards != null"
        @Add="moveCard"
        class="draggable-list"
        :list="listItem.cards"
        group="my-group"
        :class="{ 'empty_draggable-list': listItem.cards?.length === 0 }"
        :itemKey="listItem.id.toString()"
      >
        <template #item="{ element }">
          <Card
            v-if="
              listStore.projectTypeSort == null ||
              element.project == listStore.projectTypeSort
            "
            :cardItem="element"
          ></Card>
          <div v-else></div>
        </template>
      </draggable>
      <EmptyList v-if="listItem.cards?.length === 0"></EmptyList>
      <div @click="showModal = true" class="add-card">Добавить</div>
    </div>
  </div>
  <CreateCard
    :cardTypeText="listItem.name"
    :cardType="listItem.code"
    v-if="showModal"
    @closeModal="closeModal()"
  ></CreateCard>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import draggable from "vuedraggable";
import Card from "./Card.vue";
import EmptyList from "./EmptyList.vue";
import { List as ListInterface } from "../types/listCard";
import CreateCard from "../components/modal/CreateCard.vue";
import { useListSaveStore } from "../stores/listCardSave";
import { useCardStore } from "../stores/card";
import { useListStore } from "../stores/listCard";

interface State {
  showModal: boolean;
}
interface moveCardType {
  item: {
    _underlying_vm_: {
      id: number;
    };
  };
}

export default defineComponent({
  props: {
    listItem: {
      type: Object as PropType<ListInterface>,
      required: true,
    },
  },
  components: {
    draggable,
    Card,
    EmptyList,
    CreateCard,
  },
  data(): State {
    return {
      showModal: false,
    };
  },
  methods: {
    /**
     * Сортировка карточек в листе по убыванию
     */
    sortListCardReverse() {
      this.listItem.cards?.sort(function (a, b) {
        return a.score - b.score;
      });
    },
    /**
     * Сортировка карточек в листе по возврастанию
     */
    sortListCard() {
      this.listItem.cards?.sort(function (a, b) {
        return b.score - a.score;
      });
    },
    /**
     * Знакрывает модальное окно
     */
    closeModal() {
      this.showModal = false;
    },
    /**
     * Меняет stage карточек при перетаскивании
     *
     * @param {moveCardType} evt
     */
    moveCard<T extends moveCardType>(evt: T) {
      if (this.listItem.cards && this.cardStore.cards) {
        let card = evt.item._underlying_vm_;
        let indexCard = this.cardStore.cards.findIndex(
          (el) => el.id == card.id
        );

        if (indexCard >= 0) {
          this.cardStore.cards[indexCard].stage = this.listItem.code;
        }
      }
    },
  },
  computed: {
    listSaveStore: () => {
      return useListSaveStore();
    },
    listStore: () => {
      return useListStore();
    },
    cardStore: () => {
      return useCardStore();
    },
  },
});
</script>
<style scoped>
.card-list {
  width: 320px;
  padding: 12px;
  border-radius: 4px;
  background: #d5dce5;
  height: fit-content;
}
.list_header {
  display: flex;
  width: 100%;
  justify-content: space-between;
  color: #38393d;
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 12px;
}
.list-filter {
  margin-left: 8px;
}
.list-filter img {
  width: 18px;
  height: 18px;
  cursor: pointer;
}
.list-filter_arrow-reverse {
  transform: scale(1, -1);
}
.list-title_point {
  width: 4px;
  height: 4px;
  background: #7d8ca1;
  margin: auto;
  margin-right: 8px;
  border-radius: 100%;
}
.list_title {
  display: flex;
}
.list-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
}
.draggable-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.add-card {
  background: #d5dce5;
  color: #7d8ca1;
  text-align: center;
  font-family: Inter;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding: 8px 20px;
  cursor: pointer;
  z-index: 20;
}
.empty_draggable-list {
  position: absolute;
  height: 100%;
  width: 100%;
}
</style>
