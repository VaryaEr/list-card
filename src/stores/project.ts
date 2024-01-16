import { defineStore } from "pinia";
import { Project } from "../types/project";

type Filter = Project[] | null

export const useProjectStore = defineStore("project", {
    state: () => {
        return { 
            projects: null as Filter,
            isInit: true as Boolean,
        };
    },
    persist: true,
    actions: {
        /**
     * Устанавливает значение списка проектов
     *
     * @param {Filter} items
     */
        setProjectItems(items: Filter) {        
                this.projects = items
        },
    },
});
