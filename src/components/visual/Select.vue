<template>
  <div class="project-container">
    <div :class="{ active: isActive }" class="project-select">
      <button @click="isActive = !isActive" class="project-select_button">
        <span class="selected-value">{{
          listValue ? listValue.name : "Не выбрано"
        }}</span>
        <img class="arrow" src="../../assets/images/icons/ChevronDown.svg" />
      </button>
      <ul class="select-dropdown">
        <li @click="setListValue(el)" v-for="el in projectList" :key="el.id">
          <input type="radio" :id="el.id.toString() + idTitle" />
          <label :for="el.id.toString() + idTitle">{{ el.name }}</label>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Project } from "../../types/project";

interface State {
  listValue: any;
  isActive: boolean;
}

export default defineComponent({
  props: {
    projectList: {
      type: Array as any,
      required: true,
    },
    idTitle: {
      type: String as PropType<String>,
      required: true,
    },
  },
  data(): State {
    return {
      listValue: null,
      isActive: false,
    };
  },
  methods: {
    /**
     * Возвращает значение select
     */
    returnValue() {
      this.$emit("returnValue", this.listValue);
    },
    /**
     * Присваивает локальной переменной выбранное значение
     */
    setListValue(el: Project) {
      this.listValue = el;
      this.isActive = false;
      this.returnValue();
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

.select-dropdown {
  position: absolute;
  list-style: none;
  width: 100%;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  background-color: #d5dce5;
  border-radius: 4px;
  padding: 10px;
  margin-top: 10px;
  max-height: 0px;
  overflow-y: auto;
  transition: 0.5s ease;
  opacity: 0;
  visibility: hidden;
  z-index: 30;
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