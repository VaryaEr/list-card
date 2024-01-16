<template>
  <form class="form_block">
    <div class="form_header-container simple-text">
      <div class="form_header">
        <div class="form_title">Добавление</div>
        <img
          v-if="!isCardType"
          @click="closeModal()"
          class="form_close"
          src="../../assets/images/icons/CloseBig.svg"
        />
      </div>
      <div class="form_list-type simple-text">{{ cardTypeText }}</div>
    </div>

    <div class="form_name form-el">
      <div class="form_name-title simple-text">Заголовок *:</div>
      <input type="text" v-model="title" maxlength="70" class="input-primary" />
    </div>
    <div class="form_project form-el">
      <div class="form_project-title simple-text">Проект:</div>
      <Select
        v-if="cardProject.projects"
        @returnValue="getProjectSelect"
        :projectList="cardProject.projects"
        idTitle="projModal"
      ></Select>
    </div>
    <div v-if="isCardType" class="form_state form-el">
      <div class="form_project-title simple-text">Стадия *:</div>
      <Select
        v-if="listStore.lists"
        @returnValue="getListSelect"
        :projectList="listStore.lists"
        idTitle="stage"
      ></Select>
    </div>
    <div class="form-pount form-el">
      <div class="form_point-title simple-text">Балл *:</div>
      <input v-model="score" type="text" class="input-primary" />
    </div>
    <div class="form_btn-container">
      <button @click.prevent="addCard()" class="add-card btn-primary">
        Добавить
      </button>
      <button
        v-if="isCardType"
        class="btn-base"
        @click.prevent="indexTransition()"
      >
        Назад
      </button>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Select from "../visual/Select.vue";
import { Project } from "../../types/project";
import { useProjectStore } from "../../stores/project";
import { useCardStore } from "../../stores/card";
import { useListStore } from "../../stores/listCard";
import { List as ListInterface } from "../../types/listCard";

interface State {
  pval: Object | null;
  title: string | null;
  score: number | null;
  stage: string | null;
}

export default defineComponent({
  components: { Select },
  props: {
    cardTypeText: {
      type: String as PropType<String>,
      required: true,
    },
    cardType: {
      type: String as PropType<String>,
      required: false,
    },
    isCardType: {
      type: Boolean as PropType<Boolean>,
      required: true,
    },
  },
  data(): State {
    return {
      pval: null,
      title: null,
      score: null,
      stage: null,
    };
  },
  methods: {
    /**
     * Знакрывает модальное окно
     */
    closeModal() {
      this.$emit("closeModal");
    },
    /**
     * Получает выбранный проект
     *
     * @param {Project | null} projVal
     */
    getProjectSelect(projVal: Project | null) {
      if (projVal) {
        this.pval = projVal.code;
      }
    },
    /**
     * Получает выбранный лист
     *
     * @param {ListInterface | null} listVal
     */
    getListSelect(listVal: ListInterface | null) {
      if (listVal) {
        this.stage = listVal.code;
      }
    },
    /**
     * Валидация формы
     */
    validation() {
      let res = this.title && this.title?.length > 0;
      res = !!res && this.score != null && this.score > 0 && this.score <= 10;
      res = !!res && !!this.cardType;
      return res;
    },
    /**
     * Добавляет карточку
     */
    addCard() {
      let item = {
        title: this.title,
        score: this.score,
        project: this.pval ? [this.pval] : false,
        stage: this.stage || this.cardType,
      };
      this.$emit("addCard", item);
    },
    indexTransition() {
      this.$router.push({ path: "/" });
    },
  },
  computed: {
    cardProject: () => {
      return useProjectStore();
    },
    cardStore: () => {
      return useCardStore();
    },
    listStore: () => {
      return useListStore();
    },
  },
});
</script>

<style scoped>
.simple-text {
  flex-direction: column;
}
.form_btn-container {
  display: flex;
  width: 100%;
  justify-content: center;
  gap: 4px;
}
</style>