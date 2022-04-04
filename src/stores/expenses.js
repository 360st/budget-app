import { defineStore } from 'pinia'
import { getAuth } from "firebase/auth";
import { doc, setDoc, getFirestore, updateDoc, addDoc, collection, onSnapshot, orderBy, query, where } from "firebase/firestore"; 
import firebase from '../firebase/firebase'
import Date from '../date'
import { watch } from 'vue';

const {day, displayDay, displayMonth, month, date, year, week} = Date
const db = getFirestore();
const auth = getAuth();

const selectActualMonthFunction = (state) => {
  day === 1 && state.months.forEach(month => month.current = false)
  state.months.find(el => el.id === date.getMonth()).current = true
}
export const useExpensesStore = defineStore('main',{
  state: () => ({
    startWeek: String,
    startMonth: Number,
    userId: null,
    currentMonthIndex: null,
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
        name: 'Alkohol',
        budget: null,
        sum:0
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
      {
        name: "Gaz",
        budget: null,
        sum: 0
      },      
      {
        name: 'Prąd',
        budget: null,
        sum: 0
      }      
    ],
    expenses: [], 
    expensesOthersMonths: []
  }),
  getters: {
    selectActualMonth(state){
      return selectActualMonthFunction(state)
    },
    findCurrentMonth(state){
      return state.months[state.currentMonthIndex]
    },
    currentDaySpend(state){
      return new Array(state.expenses.filter(currDay => currDay.day === day).map(e => e.price)).flat().reduce((a,b) =>a + b, 0)
    },
    weeklyExpenses (state){
      return new Array(state.expenses.filter(e => e.startWeek === state.startWeek).map(e => e.price)).flat().reduce((a,b) => a + b, 0)
    }
  },
  actions: {
    findIndexOfCurrentMonthFunction(){
      this.currentMonthIndex = this.months.findIndex(curr => curr.current === true)
    },        
    downloadFirebaseData(){
      onSnapshot(doc(db, "users", auth.currentUser.uid, "months", auth.currentUser.uid), (doc) => {
        this.months = doc.data().months
      })
      onSnapshot(doc(db, "users", auth.currentUser.uid, "categories", auth.currentUser.uid), (doc) => {
        this.categories = doc.data().categories
      })     
      onSnapshot(doc(db, "startWeek", "1"), (doc) => {
        this.startWeek = doc.data().startWeek
      })
      onSnapshot(doc(db, "startMonth", "1"), (doc) => {
        this.startMonth = doc.data().startMonth
      })
      let q = query(collection(db, "users", auth.currentUser.uid, "expenses"), where("month", "==", month), orderBy("day"), orderBy("category"))
      onSnapshot(q, (querySnapshot) => {
        let data = []
        querySnapshot.forEach((doc) => { 
          data.push(doc.data())
      })
        this.expenses = data
        if(this.userId === null){
          this.userId = auth.currentUser.uid
          localStorage.setItem("logged", true)
        }
        if(week === 0){
          setDoc(doc(db, "startWeek", "1"),{
            startWeek: `${day}.${month}`
          })
        } 
        if(day === 1){
          selectActualMonthFunction(this)
          this.updateMonthsFunction()  

          if(this.startMonth !== month){
            this.categories.forEach(e => e.sum = 0)
            setDoc(doc(db, "startMonth", "1"), {
              startMonth: month
            })
            this.updateCategoryFunction()
          }          
        }      
      })
    },
    downloadFirebaseExpensesOtherMonths(data){
      let q = query(collection(db, "users", auth.currentUser.uid, "expenses"), where("month", "==", data), orderBy("day"), orderBy("category"))
      if(!this.expensesOthersMonths.some((e) => e.month === data)){
        onSnapshot(q, (querySnapshot) => {
          let data = []
          querySnapshot.forEach((doc)=> {
            data.push(doc.data())
          })
          this.expensesOthersMonths = [...this.expensesOthersMonths, ...data]
        })
      }
    },
    updateCategoryFunction(){
      return updateDoc(doc(db, "users", auth.currentUser.uid, "categories", auth.currentUser.uid), {
        categories: this.categories
      })    
    },
    updateMonthsFunction(){
      return updateDoc(doc(db, "users", auth.currentUser.uid, "months", auth.currentUser.uid), {
        months: this.months
      })    
    },
    sortCategoriesAlphabetical() {
     this.categories.sort((a, b) => {
      return a.name.localeCompare(b.name)
     })
    },

    async addMonthBudget(value){
      this.months[this.currentMonthIndex].monthBudget = value
      await this.updateMonthsFunction()    
    },

    async addCategory(data){
      this.categories.unshift({...data, sum:0})
      this.sortCategoriesAlphabetical()
      await this.updateCategoryFunction()    
    },

    async editCategory(index, value){
      this.categories[index].budget = value
      await this.updateCategoryFunction()
    },   

    async removeCategory(index){
      this.categories.splice(index, 1)
      await this.updateCategoryFunction()
    },
    async addExpenses(price, category){
      this.categories.filter(e => e.name === category).map(e => e.sum += price)
      await this.updateCategoryFunction()

      this.months[this.currentMonthIndex].spend += price
      await this.updateMonthsFunction() 

      await addDoc(collection(db, "users", auth.currentUser.uid, "expenses"), {
        price,
        category,
        displayMonth,
        month,
        day,
        year,
        displayDay,
        startWeek: this.startWeek
      })   
    },
  }
})