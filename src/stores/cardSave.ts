import { defineStore } from "pinia";
import { Card as CardInterface } from "../types/card";
import { useListSaveStore } from "./listCardSave";

type Filter = CardInterface[] | null

export const useCardSaveStore = defineStore("cardSave", {
    state: () => {
        return { 
            cSave: null as Filter,
        };
    },
    persist: true,
    getters: {
        listStore(){
            return useListSaveStore()
        }
    },
    actions: {
    /**
     * Устанавливает значение карточек
     *
     * @param {Filter} items
     */
        setCardItems(items: Filter) {       
                this.cSave = items
        },
    },
});
