
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
import { List as ListInterface } from "./types/listCard";
import { useListStore } from "./stores/listCard";
import { useCardStore } from "./stores/card";
import { useProjectStore } from "./stores/project";
import { useListSaveStore } from "./stores/listCardSave";
import { useCardSaveStore } from "./stores/cardSave";
import { Card as CardInterface } from "./types/card";
import { Project as ProjectInterface } from "./types/project";

type Filter = CardInterface[] | null;

interface State {
  lists: ListInterface[] | null;
  cards: Filter;
  projects: ProjectInterface[] | null;
}
export default defineComponent({
  components: { FiltersProject },
  data(): State {
    return {
      lists: [
        {
          id: 1,
          sort: 10,
          name: "Стадия 1",
          code: "stage-1",
        },
        {
          id: 2,
          sort: 20,
          name: "Стадия 2",
          code: "stage-2",
        },
        {
          id: 3,
          sort: 30,
          name: "Стадия 3",
          code: "stage-3",
        },
        {
          id: 4,
          sort: 40,
          name: "Стадия 4",
          code: "stage-4",
        },
      ],
      cards: [
        {
          id: 1,
          title: "Карточка 1",
          stage: "stage-1",
          project: false,
          score: 3.2,
        },
        {
          id: 2,
          title: "Карточка 2",
          stage: "stage-1",
          project: ["project-1"],
          score: 2,
        },
        {
          id: 3,
          title: "Карточка 3",
          stage: "stage-1",
          project: ["project-2"],
          score: 5,
        },
        {
          id: 4,
          title: "Карточка 4",
          stage: "stage-1",
          project: ["project-1"],
          score: 3,
        },
        {
          id: 5,
          title: "Карточка 5",
          stage: "stage-2",
          project: ["project-1"],
          score: 5,
        },
        {
          id: 6,
          title: "Карточка 6",
          stage: "stage-3",
          project: ["project-2"],
          score: 2,
        },
        {
          id: 7,
          title: "Карточка 7",
          stage: "stage-3",
          project: ["project-1"],
          score: 4,
        },
        {
          id: 8,
          title: "Карточка 8",
          stage: "stage-3",
          project: false,
          score: 1,
        },
      ],
      projects: [
        {
          id: 1,
          code: "project-1",
          name: "Проект 1",
          sort: 10,
        },
        {
          id: 2,
          code: "project-2",
          name: "Проект 2",
          sort: 20,
        },
        {
          id: 3,
          code: "project-3",
          name: "Проект 3",
          sort: 30,
        },
        {
          id: 4,
          code: "project-4",
          name: "Проект 4",
          sort: 40,
        },
      ],
    };
  },
  mounted() {
    this.simulatedRequest();
  },
  methods: {
    /**
     * Симуляция получения данных для карточек
     */
    simulatedRequest() {
      if (this.listStore.isInit) {
        this.listStore.setListItems(this.lists);
        this.cardStore.setCardItems(this.cards);
        this.projectStore.setProjectItems(this.projects);
      } else {
        this.listStore.setListItems(
          JSON.parse(JSON.stringify(this.listSaveStore.lSave))
        );
        this.cardStore.setCardItems(
          JSON.parse(JSON.stringify(this.cardSaveStore.cSave))
        );
      }
      this.listStore.projectTypeSort = null;
    },
  },
  computed: {
    listStore: () => {
      return useListStore();
    },
    cardStore: () => {
      return useCardStore();
    },
    projectStore: () => {
      return useProjectStore();
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
