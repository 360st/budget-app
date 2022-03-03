import { defineStore } from 'pinia'

export const useCategoryStore = defineStore('category',{
  state: () => ({
    category: []
  }),
  actions: {
    addCategory(data){
      this.category.unshift(data)
    },
    editCategory(index, value){
      this.category[index].budget = value
    }
  }
})
