import { defineStore } from 'pinia'
import Date from '../date'
import { ref, watch } from 'vue'

const {day, dayDecimal, month, date} = Date

export const useExpensesStore = defineStore('main',{
  state: () => ({
    months: [
      {
        id: 0,
        name: "Styczeń",
        spent: 0,
        monthBudget: null,
        current: false
      },
      {
        id: 1,
        name: "Luty",
        spent: 0,
        monthBudget: null,
        current: false
      },
      {
        id: 2,
        name: "Marzec",
        monthBudget: null,
        spent: 0,
        current: false
      },
      {
        id: 3,
        name: "Kwiecień",
        spent: 0,
        monthBudget: null,
        current: false
      },
      {
        id: 4,
        name: "Maj",
        spent: 0,
        monthBudget: null,
        current: false
      },
      {
        id: 5,
        name: "Czerwiec",
        spent: 0,
        monthBudget: null,
        current: false
      }, 
      {
        id: 6,
        name: "Lipiec",
        spent: 0,
        monthBudget: null,
        current: false
      }, 
      {
        id: 7,
        name: "Sierpień",
        spent: 0,
        monthBudget: null,
        current: false
      }, 
      {
        id: 8,
        name: "Wrzesień",
        spent: 0,
        monthBudget: null,
        current: false
      }, 
      {
        id: 9,
        name: "Październik",
        spent: 0,
        monthBudget: null,
        current: false
      }, 
      {
        id: 10,
        name: "Listopad",
        spent: 0,
        monthBudget: null,
        current: false
      }, 
      {
        id: 11,
        name: "Grudzień",
        spent: 0,
        monthBudget: null,
        current: false
      }                        
    ],
    categories: [
      {
        name: 'Art. Spożywcze',
        budget: 600,
        sum: 0,
      },
      {
        name: 'Opłaty za obiady',
        budget: 200,
        sum: 0
      },    
      {
        name: 'Internet',
        budget: null
      },     
      {
        name: 'Wyjście ze znajomymi',
        budget: 150,
        sum: 0
      },   
      {
        name: 'Tankowanie',
        budget: null
      },              
    ],
    expenses: []    
  }),
  getters: {

  },
  actions: {
    addMonthBudget(value){
      this.months.find(el => el.id === date.getMonth()).monthBudget = value
    },
    addCategory(data){
      this.categories.unshift({...data, sum:0})
      console.log(this.categories)
    },
    editCategory(index, value){
      this.categories[index].budget = value
    },    
    addExpenses(price, category){
      this.categories.filter(e => e.name === category).map(e => e.sum += price)
      this.expenses.unshift({price, category, month, day, dayDecimal})
      this.months.find(curr => curr.current === true).spent += price
    }
  }
})
