<template>
  <Select
    v-if="cardProject.projects"
    @returnValue="getProjectSelect"
    :projectList="cardProject.projects"
    idTitle="projFilters"
  ></Select>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Select from "./visual/Select.vue";
import { Project } from "../types/project";
import { useProjectStore } from "../stores/project";
import { useListStore } from "../stores/listCard";

interface State {
  pval: Project | null;
}

export default defineComponent({
  data(): State {
    return {
      pval: null,
    };
  },
  components: { Select },
  methods: {
    /**
     * Фильтрация карточек по типу проекта
     *
     * @param {Project | null} projVal
     */
    getProjectSelect(projVal: Project | null) {
      this.pval = projVal;
      if (projVal) {
        this.listStore.projectTypeSort = projVal?.code;
      }
    },
  },
  computed: {
    cardProject: () => {
      return useProjectStore();
    },
    listStore: () => {
      return useListStore();
    },
  },
});
</script>

<style scoped>
.project-select {
  position: relative;
  width: 400px;
  max-width: 100%;
  width: 125px;
}

.project-select_button {
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: none;
  background: #d5dce5;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #7d8ca1;
  font-family: Inter;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.selected-value {
  text-align: left;
}

.arrow {
  transition: transform ease-in-out 0.3s;
  width: 16px;
  height: 14px;
}

.select-dropdown:focus-within {
  box-shadow: 0 10px 25px rgba(94, 108, 233, 0.6);
}

.select-dropdown li {
  position: relative;
  cursor: pointer;
  display: flex;
  gap: 1rem;
  align-items: center;
}

.select-dropdown li label {
  width: 100%;
  padding: 8px 10px;
  cursor: pointer;
  display: flex;
  gap: 1rem;
  align-items: center;
}

.select-dropdown::-webkit-scrollbar {
  width: 7px;
}
.select-dropdown::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 25px;
}

.select-dropdown::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 25px;
}

.select-dropdown input[type="radio"] {
  position: absolute;
  left: 0;
  opacity: 0;
}

.project-select.active .arrow {
  transform: rotate(180deg);
}

.project-select.active .select-dropdown {
  opacity: 1;
  visibility: visible;
  max-height: 200px;
}
.project-title {
  margin-right: 4px;
}
.project-container {
  display: flex;
  align-items: center;
  color: #7d8ca1;
  font-family: Inter;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
</style>