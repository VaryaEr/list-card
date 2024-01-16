
import { defineStore } from "pinia";
import { List as ListInterface } from "../types/listCard";
import { Card as CardInterface } from "../types/card";

type Filter = ListInterface[] | null
type Card = CardInterface[] | null

export const useListSaveStore = defineStore("listSave", {
    state: () => {
        return { 
            lSave: null as Filter,
        };
    },
    persist: true,
    actions: {
    /**
     * Устанавливает значение карточек списков
     *
     * @param {Filter} items
     */
        setListItems(items: Filter) { 
            this.lSave = items
        },
    },
});
