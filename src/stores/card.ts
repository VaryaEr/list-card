import { defineStore } from "pinia";
import { Card as CardInterface } from "../types/card";
import { useListStore } from "./listCard";

type Filter = CardInterface[] | null

export const useCardStore = defineStore("card", {
    state: () => {
        return { 
            cards: null as Filter,
            isInit: true as Boolean,
            id: 0 as number,
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
                if(this.isInit){
                    this.id = Number(this.cards?.length)
                }
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
                this.id ++
                card.id = this.id
                this.cards?.push(item)
                this.listStore.createCard(item)
                this.listStore.setCardsToList(this.cards)
            }
            
        },
        /**
     * Удаляет выбранную карточку
     *
     * @param {CardInterface} item
     */
        removeCard<T extends CardInterface>(item: T){
            if(this.cards){
                let cardIndex = this.findIndex(item)
                if(cardIndex){
                    this.cards.splice(cardIndex, 1)
                    this.listStore.setCardsToList(this.cards)
                }
                
            }
        },
        /**
     * Обновляет выбранную карточку
     *
     * @param {CardInterface} item
     */
        changeCard<T extends CardInterface>(item: T){
            if(this.cards){
                let cardIndex = this.findIndex(item)
                if(cardIndex != null){
                    this.cards[cardIndex] = item
                    this.listStore.setCardsToList(this.cards)
                }
                
            }
        },
         /**
     * Поиск index карточки
     *
     * @param {CardInterface} item
     */
        findIndex<T extends CardInterface>(item: T){
            if(this.cards){
                return this.cards.findIndex(
                    (el) => el.id == item.id
                );
            }
            return null
        }
    },
});
