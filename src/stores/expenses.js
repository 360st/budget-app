import { defineStore } from 'pinia'
import Date from '../date'

const {day, displayDay, displayMonth, month, date} = Date
export const useExpensesStore = defineStore('main',{
  state: () => ({
    months: [
      {
        id: 0,
        name: "Styczeń",
        spend: 0,
        monthBudget: null,
        current: false
      },
      {
        id: 1,
        name: "Luty",
        spend: 0,
        monthBudget: null,
        current: false
      },
      {
        id: 2,
        name: "Marzec",
        spend: 0,        
        monthBudget: null,
        current: false
      },
      {
        id: 3,
        name: "Kwiecień",
        spend: 0,
        monthBudget: null,
        current: false
      },
      {
        id: 4,
        name: "Maj",
        spend: 0,
        monthBudget: null,
        current: false
      },
      {
        id: 5,
        name: "Czerwiec",
        spend: 0,
        monthBudget: null,
        current: false
      }, 
      {
        id: 6,
        name: "Lipiec",
        spend: 0,
        monthBudget: null,
        current: false
      }, 
      {
        id: 7,
        name: "Sierpień",
        spend: 0,
        monthBudget: null,
        current: false
      }, 
      {
        id: 8,
        name: "Wrzesień",
        spend: 0,
        monthBudget: null,
        current: false
      }, 
      {
        id: 9,
        name: "Październik",
        spend: 0,
        monthBudget: null,
        current: false
      }, 
      {
        id: 10,
        name: "Listopad",
        spend: 0,
        monthBudget: null,
        current: false
      }, 
      {
        id: 11,
        name: "Grudzień",
        spend: 0,
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
        budget: null,
        sum: 0,
      },     
      {
        name: 'Wyjście ze znajomymi',
        budget: 150,
        sum: 0
      },   
      {
        name: 'Tankowanie',
        budget: null,
        sum: 0,
      },              
    ],
    expenses: []    
  }),
  getters: {
    selectActualMonth(state){
      return state.months.find(el => el.id === date.getMonth()).current = true
    },
    findCurrentMonth(state){
      return state.months.find(month => month.current === true)
    },
    currentDaySpend(state){
      return new Array(state.expenses.filter(currDay => currDay.day === day).map(e => e.price)).flat().reduce((a,b) => a + b, 0)
    }
  },
  actions: {
    addMonthBudget(value){
      this.months.find(el => el.id === date.getMonth()).monthBudget = value
    },
    addCategory(data){
      this.categories.unshift({...data, sum:0})
    },
    editCategory(index, value){
      this.categories[index].budget = value
    },   
    removeCategory(index){
      this.categories.splice(index, 1)
    },
    addExpenses(price, category){
      this.categories.filter(e => e.name === category).map(e => e.sum += price)
      this.expenses.unshift({price, category, displayMonth, month, day, displayDay})
      this.months.find(curr => curr.current === true).spend += price
      console.log(this.expenses)
    }
  }
})
