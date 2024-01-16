import { defineStore } from "pinia";
import { List as ListInterface } from "../types/listCard";
import { Card as CardInterface } from "../types/card";

type Filter = ListInterface[] | null
type Card = CardInterface[] | null

export const useListStore = defineStore("list", {
    state: () => {
        return { 
            lists: null as Filter,
            isInit: true as Boolean,
            projectTypeSort: null as String | null,
        };
    },
    persist: true,
    actions: {
    /**
     * Устанавливает значение списков
     *
     * @param {Filter} items
     */
        setListItems(items: Filter) {
                this.lists = items
        },
    /**
     * Устанавливает значение карточек списков
     *
     * @param {Card} items
     */
        setCardsToList(items: Card){
            this.lists?.forEach(el => {
                el.cards = []
            });
            items?.forEach(el => {
                this.lists?.forEach(item => {
                    if(item.code === el.stage){
                        item.cards?.push(el) 
                    }
                });
            });
        },
     /**
     * Добавляет новую карточку
     *
     * @param {CardInterface} card
     */
        createCard<T extends CardInterface>(card: T){
            this.lists?.forEach(item => {
                if(item.code === card.stage){
                    item.cards?.push(card) 
                }
            });
        }
    },
});
