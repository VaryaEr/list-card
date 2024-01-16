import { defineStore } from "pinia";
import { Card as CardInterface } from "../types/card";
import { useListStore } from "./listCard";

type Filter = CardInterface[] | null

export const useCardStore = defineStore("card", {
    state: () => {
        return { 
            cards: null as Filter,
            isInit: true as Boolean,
        };
    },
    persist: true,
    getters: {
        listStore(){
            return useListStore()
        }
    },
    actions: {
    /**
     * Устанавливает значение карточек
     *
     * @param {Filter} items
     */
        setCardItems(items: Filter) {
            this.cards = items
            if(this.cards === null || this.isInit){
                this.listStore.setCardsToList(items)
            }
        },
    /**
     * Добавляет новую карточку
     *
     * @param {CardInterface} item
     */
        createCard<T extends CardInterface>(item: T){
            let card = item
            if(this.cards){
                card.id = this.cards?.length + 1
                this.cards?.push(item)
                this.listStore.createCard(item)
                this.listStore.setCardsToList(this.cards)
            }
            
        }
    },
});
